# Manpower Agency Landing Page — Specification

## 1. Overview

A static, single-page marketing/landing site for a manpower (staffing/recruitment) agency. No backend, no database, no authentication. Built to be hosted on GitHub Pages and viewed on both desktop and mobile web.

**Tech stack:** React 18 + Vite, plain CSS (no UI framework), Tabler Icons (self-hosted webfont).

**Non-goals:** No CMS, no server-side rendering, no contact form submission handling (form is UI-only unless wired to a third-party form service), no authentication, no multi-page routing (single page with anchor-link navigation).

---

## 2. Project structure

```
manpower-landing/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── fonts/
│       └── tabler-icons/
│           ├── tabler-icons.min.css
│           └── fonts/
│               ├── tabler-icons.woff2
│               └── tabler-icons.woff
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── index.css
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 3. Build & deployment requirements

| Requirement | Detail |
|---|---|
| Build tool | Vite |
| Output dir | `dist/` |
| Base path | `vite.config.js` → `base: "/<repo-name>/"` (must match GitHub repo name exactly, case-sensitive) |
| Asset path style | All asset references in `index.html` and CSS must be **relative** (e.g. `./fonts/...`) or use `import` so Vite rewrites them with the base path. Absolute paths starting with `/` will break under a non-root base. |
| Hosting | GitHub Pages, source = GitHub Actions |
| CI/CD | `.github/workflows/deploy.yml` — triggers on push to `main`, runs `npm install && npm run build`, uploads `dist/` as Pages artifact, deploys |
| Icon font | Self-hosted under `public/fonts/tabler-icons/` (not CDN) — avoids browser tracking-prevention blocking |
| Node version | 20.x (CI and local) |

---

## 4. Page structure (sections, in order)

1. **Nav** — sticky header, brand, desktop link row, mobile hamburger menu
2. **Hero** — headline, subtext, CTA buttons, popular-roles pill list, hero image with two floating stat cards
3. **Industries** — badge + heading + subtitle, 8-card grid (2 rows of 4 desktop, responsive down to 1 column mobile)
4. **Why Us** — badge + heading + subtitle, 3-card grid
5. **Testimonials** — badge + heading, 2-card grid of client quotes
6. **Contact** — badge + heading + subtitle, two-column layout: contact info card (name, role, email, phone, address) + contact form card (name, email, message, submit — display only)
7. **Footer** — brand, link list, social icon row, copyright line

---

## 5. Content model (single source of truth: `CONFIG` object in `src/App.jsx`)

All editable content must live in one exported/top-level `CONFIG` object. No content strings hardcoded elsewhere in JSX.

```js
CONFIG = {
  agency: {
    name: string,        // full agency name, used in nav brand & footer
    logoText: string,    // 1-3 char initials shown in badge if no image logo
    tagline: string,     // currently unused in layout but reserved
  },

  nav: {
    links: [{ label: string, href: string }],  // anchor links e.g. "#industries"
    ctaLabel: string,
    ctaHref: string,
  },

  hero: {
    title: string,
    subtitle: string,
    popularLabel: string,
    popularRoles: string[],          // rendered as pills
    image: string,                   // URL or imported asset
    stats: [
      { value: string, label: string },  // exactly 2 — top-left and bottom-right floating cards
      { value: string, label: string },
    ],
    primaryCta: { label: string, href: string },
    secondaryCta: { label: string, href: string },
  },

  industries: {
    badge: string,
    title: string,
    subtitle: string,
    items: [
      {
        icon: string,      // Tabler icon class, e.g. "ti-code"
        title: string,
        description: string,
        color: "blue" | "green" | "amber" | "rose",  // maps to COLOR_RAMPS
      },
      // ... 8 items total for the default 4-column grid
    ],
  },

  whyUs: {
    badge: string,
    title: string,
    subtitle: string,
    items: [
      { icon: string, title: string, description: string },
      // 3 items for default 3-column grid
    ],
  },

  testimonials: {
    badge: string,
    title: string,
    items: [
      { quote: string, name: string, role: string },
      // 2 items for default 2-column grid
    ],
  },

  contact: {
    badge: string,
    title: string,
    subtitle: string,
    contactPerson: {
      name: string,
      role: string,
      email: string,   // used for mailto: link
      phone: string,   // used for tel: link
    },
    address: string,
    formNote: string,   // disclaimer shown under the form
  },

  footer: {
    copyrightName: string,
    links: [{ label: string, href: string }],
    socials: [{ icon: string, href: string, label: string }],  // icon = Tabler class
  },
}
```

### Color ramp map (for industry card icons)

```js
COLOR_RAMPS = {
  blue:  { bg: "#dbeafe", fg: "#2563eb" },
  green: { bg: "#dcfce7", fg: "#16a34a" },
  amber: { bg: "#fef3c7", fg: "#d97706" },
  rose:  { bg: "#fee2e2", fg: "#e11d48" },
}
```

---

## 6. Component breakdown

| Component | Responsibility | Reads from CONFIG |
|---|---|---|
| `Nav` | Sticky header; desktop nav row; mobile menu toggle (open/close state via `useState`) | `agency`, `nav` |
| `Hero` | Headline, subtitle, CTAs, popular role pills, hero image, 2 floating stat cards | `hero` |
| `Industries` | Section wrapper + responsive grid of industry cards with colored icon boxes | `industries`, `COLOR_RAMPS` |
| `WhyUs` | Section wrapper (alt background) + 3-column centered card grid | `whyUs` |
| `Testimonials` | Section wrapper + 2-column quote card grid | `testimonials` |
| `Contact` | Section wrapper (alt background) + 2-column layout: info card + form card | `contact` |
| `Footer` | Dark footer with brand, links, socials, copyright (auto current year) | `agency`, `footer` |
| `Badge` | Small pill label, reused across section heads | — |
| `Section` | Generic `<section>` + `.container` wrapper, optional `alt` background prop | — |

---

## 7. Styling requirements

- Plain CSS in `src/index.css`, using CSS custom properties for theme values:
  - `--primary`, `--primary-dark`, `--text-main`, `--text-muted`, `--border-color`, `--bg-alt`, `--bg-dark`, `--radius-lg`, `--radius-md`, `--max-width`
- Container max-width: 1160px, centered, 20px horizontal padding
- Section vertical padding: 64px (48px on mobile ≤640px)
- Cards: white background, 1px border (`--border-color`), `--radius-lg` corners, 24px padding
- Buttons: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-sm` variants
- Typography: system font stack, h1 2.75rem → 1.8rem mobile, h2 2rem → 1.6rem mobile, h3 1.05rem

### Responsive breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 900px` (desktop) | Industries grid: 4 cols; Why Us: 3 cols; Testimonials: 2 cols; Contact: 2-col layout; full desktop nav |
| `≤ 900px` (tablet) | Industries grid: 2 cols; Why Us / Testimonials / Contact: 1 col |
| `≤ 640px` (mobile) | Industries grid: 1 col; nav collapses to hamburger menu; hero stat cards become static stacked blocks instead of floating overlays; reduced font sizes and section padding |

---

## 8. Icon font requirements

- Use Tabler Icons (outline style), referenced via CSS classes like `ti ti-code`
- **Must be self-hosted**, not loaded from a CDN (cdnjs/jsdelivr trigger browser tracking-prevention warnings and can fail to load)
- Files live in `public/fonts/tabler-icons/` (CSS + woff/woff2), copied verbatim into `dist/` by Vite
- `index.html` references the CSS with a **relative path** (`./fonts/tabler-icons/tabler-icons.min.css`) so the Vite `base` prefix applies correctly
- The font-face `src` paths inside that CSS file must be relative to its own location (e.g. `fonts/tabler-icons.woff2`)

---

## 9. Accessibility & semantics

- One `<h1>` (hero title), `<h2>` per section heading, `<h3>` for card titles
- All decorative icons: `aria-hidden="true"`
- Icon-only buttons/links (nav toggle, social icons): `aria-label`
- Form inputs: associated `<label>` wrapping each field
- Color contrast: text on colored backgrounds uses the corresponding `-fg` (dark) shade from `COLOR_RAMPS`, never plain black/gray on tinted backgrounds

---

## 10. Acceptance criteria

1. `npm install && npm run build` completes without errors
2. `dist/index.html` references all assets with the correct `/marketing-site/`-prefixed (or configured) paths
3. Page renders correctly at viewport widths 360px (mobile), 768px (tablet), 1280px (desktop) — no horizontal overflow, no overlapping elements
4. All icons render (no missing-glyph boxes) with no console errors related to font loading or tracking prevention
5. All anchor nav links scroll to the correct section
6. Changing any value in `CONFIG` updates the corresponding rendered text/image/link with no other code changes required
7. Mobile nav opens/closes via hamburger toggle and closes after a link is tapped
8. GitHub Actions workflow successfully builds and deploys to GitHub Pages on push to `main`
