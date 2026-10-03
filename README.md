# SafeBank Webpage

This branch contains a responsive static webpage based on the SafeBank Android app in `main`.

## Included

- `index.html` - SafeBank dashboard, transactions, loan products, and loan calculator.
- `style.css` - Responsive layout and visual styling.
- `app.js` - Client-side navigation, transaction rendering, notifications, and loan-payment calculation.

The page uses sample data only. It does not connect to a real banking account or process payments.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Source feature mapping

The webpage reflects the current Android progress documented on `main`: login/home navigation, account balance, transactions, loan types, and the loan calculator. It is intentionally frontend-only so it can later be connected to the Android app's SQLite-backed services or an API.
