# Portfolio

Static portfolio page built with HTML, Tailwind CSS (CDN), and JavaScript.

## Run locally

Use the built-in Node server:

```powershell
npm start
```

Then open `http://localhost:3000/index.html` or `http://localhost:3000/projects.html`.

## Projects page

The `projects.html` page loads public repositories automatically from GitHub using the username set on the `<body>` element. If the GitHub API is unavailable, the page falls back to local demo projects.

## Contact form email

The contact form sends messages through SMTP. Set these environment variables before starting the server:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM` (optional)
- `SMTP_SECURE` (optional, `true` for port 465)
- `CONTACT_TO_EMAIL` (destination inbox)

Example for PowerShell:

```powershell
$env:SMTP_HOST="smtp.example.com"
$env:SMTP_PORT="587"
$env:SMTP_USER="you@example.com"
$env:SMTP_PASS="your-app-password"
$env:CONTACT_TO_EMAIL="you@example.com"
npm start
```

You can also store the same values in a local `.env` file at the project root. Use `.env.example` as a template and never commit the real credentials.

Gmail example:

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=youraddress@gmail.com`
- `SMTP_PASS=your-app-password`
- `CONTACT_TO_EMAIL=youraddress@gmail.com`

Outlook example:

- `SMTP_HOST=smtp.office365.com`
- `SMTP_PORT=587`
- `SMTP_USER=youraddress@outlook.com`
- `SMTP_PASS=your-password-or-app-password`
- `CONTACT_TO_EMAIL=youraddress@outlook.com`

## Customize

- Replace the hero placeholder with your photo.
- Update the GitHub username and excluded repositories in `projects.html`.
- Adjust colors in `style.css`.
