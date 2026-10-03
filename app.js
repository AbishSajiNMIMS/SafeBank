const transactions = [
  { merchant: "Whole Foods Market", detail: "Today, 10:42 AM", amount: "-$86.24", type: "groceries", icon: "▦" },
  { merchant: "Salary deposit", detail: "Yesterday, 9:00 AM", amount: "+$4,850.00", type: "income", icon: "↙" },
  { merchant: "Netflix", detail: "Oct 1, 2026", amount: "-$15.49", type: "subscription", icon: "N" },
  { merchant: "Blue Bottle Coffee", detail: "Sep 30, 2026", amount: "-$6.80", type: "coffee", icon: "☕" },
  { merchant: "Uber", detail: "Sep 29, 2026", amount: "-$24.70", type: "transport", icon: "U" }
];

const viewTitles = {
  dashboard: "Good morning, Alex ✦",
  transactions: "Your transactions",
  loans: "Find the right loan",
  calculator: "Plan your loan"
};

function transactionMarkup(transaction) {
  return `<div class="transaction">
    <span class="transaction-icon ${transaction.type}">${transaction.icon}</span>
    <span class="transaction-copy"><strong>${transaction.merchant}</strong><small>${transaction.detail}</small></span>
    <strong class="transaction-amount ${transaction.amount.startsWith("+") ? "positive" : ""}">${transaction.amount}</strong>
  </div>`;
}

function showView(viewName) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.viewPanel !== viewName);
  });
  document.querySelectorAll("[data-view]").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName && item.classList.contains("nav-item"));
  });
  document.querySelector("#page-title").textContent = viewTitles[viewName];
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function updatePayment() {
  const amount = Number(document.querySelector("#loan-amount").value);
  const years = Number(document.querySelector("#loan-term").value);
  const rate = Number(document.querySelector("#interest-rate").value);
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const payment = amount * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1);
  document.querySelector("#amount-output").textContent = `$${amount.toLocaleString()}`;
  document.querySelector("#term-output").textContent = `${years} ${years === 1 ? "year" : "years"}`;
  document.querySelector("#rate-output").textContent = `${rate.toFixed(2)}%`;
  document.querySelector("#payment-output").textContent = `$${payment.toFixed(2)}`;
}

document.querySelector("#recent-transactions").innerHTML = transactions.slice(0, 4).map(transactionMarkup).join("");
document.querySelector("#all-transactions").innerHTML = transactions.map(transactionMarkup).join("");

document.addEventListener("click", (event) => {
  const viewTrigger = event.target.closest("[data-view]");
  if (viewTrigger) {
    event.preventDefault();
    showView(viewTrigger.dataset.view);
    return;
  }
  const toastTrigger = event.target.closest("[data-toast]");
  if (toastTrigger) showToast(toastTrigger.dataset.toast);
});

document.querySelectorAll(".calculator-card input").forEach((input) => input.addEventListener("input", updatePayment));
document.querySelector("#notification-button").addEventListener("click", () => showToast("You’re all caught up."));
document.querySelector("#support-button").addEventListener("click", () => showToast("Support request opened."));
document.querySelector("#sign-out").addEventListener("click", () => showToast("You have been safely signed out."));
