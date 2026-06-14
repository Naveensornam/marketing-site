# Manpower Agency Landing Page

A single-page, responsive landing page template for a staffing/manpower agency, built with React + Vite. No backend required — pure static site, ready for GitHub Pages.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Customize content

All editable content lives in **one place**: `src/App.jsx`, inside the `CONFIG` object at the top of the file. Edit:

- `agency` — name, logo initials, tagline
- `nav` — nav links and call-to-action button
- `hero` — headline, subtitle, popular roles, hero image, stat callouts
- `industries` — the 8 industry cards (icon, title, description, color)
- `whyUs` — the 3 "why choose us" cards
- `testimonials` — client quotes
- `contact` — contact person name, role, email, phone, address
- `footer` — copyright name, footer links, social icons

No JSX knowledge needed for basic edits — just change the text inside the quotes.

### Changing icons
Icons use [Tabler Icons](https://tabler.io/icons) (free, outline style). Browse the site, copy a class name like `ti-truck`, and paste it into the config (e.g. `icon: "ti-truck"`).

### Changing the hero image
Replace the `hero.image` URL with any image link, or:
1. Put your image file in `src/assets/`
2. Import it: `import heroImg from "./assets/your-image.jpg";`
3. Set `hero.image: heroImg`

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy to GitHub Pages

### Option A — GitHub Actions (recommended, automatic)

1. Push this project to a GitHub repo.
2. In `vite.config.js`, set `base` to `"/your-repo-name/"`.
3. In your repo: **Settings → Pages → Source → GitHub Actions**.
4. Push to the `main` branch — the included workflow (`.github/workflows/deploy.yml`) will build and deploy automatically.
5. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Option B — Manual deploy with gh-pages

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch. Then in **Settings → Pages**, set the source branch to `gh-pages`.

## Notes

- The contact form is display-only (no backend). To make it functional, connect it to a service like [Formspree](https://formspree.io) or [Getform](https://getform.io) by setting the form's `action` attribute and `method="POST"`.
- The site is fully responsive — tested layouts for mobile (single column, hamburger menu) and desktop (multi-column grid, full nav).
