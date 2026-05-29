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

## Customize

- Replace the hero placeholder with your photo.
- Update the GitHub username and excluded repositories in `projects.html`.
- Adjust colors in `style.css`.
