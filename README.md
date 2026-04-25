# Hamro Idea Website

Static multi-page marketing website for Hamro Idea, a Nepal-based software, web development, CMS, and digital product studio.

## Overview

Hamro Idea helps startups, local businesses, agencies, growing companies, and enterprise teams design and build high-performing websites, web apps, CMS platforms, eCommerce systems, and custom software.

The site is intentionally static and keeps the existing premium technical visual direction while improving positioning, navigation, SEO, conversion paths, and maintainability.

## Business Purpose

- Communicate Hamro Idea as a credible Nepal-based software and web studio.
- Make services easier to understand within the first few seconds.
- Route visitors to overview pages, detailed services, selected work, process, and project inquiry paths.
- Avoid fake metrics, client claims, testimonials, awards, or placeholder social links.

## Tech Stack

- HTML and Pug templates
- SCSS compiled to CSS
- JavaScript bundled through Gulp, Babel, and webpack-stream
- BrowserSync for local development
- Static assets in `assets/`
- Source files in `src/`

## Page Structure

- `index.html` - homepage
- `services.html` - service overview
- `solutions.html` - solution paths
- `work.html` - selected work overview
- `process.html` - delivery process
- `about.html` - studio overview
- `insights.html` - articles and resources
- `contact.html` - contact options
- `services/*.html` - service detail pages
- `work/*.html`, `process/*.html`, `about/*.html`, `insights/*.html`, `contact/*.html` - detail pages
- `privacy-policy.html`, `terms-of-use.html`, `cookie-consent.html` - legal pages
- `404.html`, `robots.txt`, `sitemap.xml` - QA and SEO support files

## Setup

```bash
npm install
npm run start
```

`npm run start` runs the Gulp build, starts BrowserSync, and watches source files.

## Build

```bash
npm run build
```

The current workflow writes production files to the repository root to preserve existing static hosting and asset paths. The `clear` task only removes generated asset folders and bundled files; it does not delete root HTML files.

## Deployment

Deploy the repository root as a static site after running:

```bash
npm install
npm run build
```

Confirm the hosting platform serves:

- `/index.html`
- `/services.html`
- `/sitemap.xml`
- `/robots.txt`
- `/404.html`

## Design System

The visual direction is documented in `STYLEGUIDE.md`.

Key direction:

- premium technical feel
- navy and indigo as trust/action colors
- magenta and gold only as small highlights
- consistent cards, spacing, buttons, CTAs, and focus states
- reduced-motion support where animation is used

## SEO Notes

- Homepage metadata targets web development, custom software, and digital product studio positioning in Nepal.
- Overview pages have unique titles, descriptions, canonicals, Open Graph tags, and Twitter card tags.
- Placeholder social URLs were removed from schema and footer links.
- `robots.txt` and `sitemap.xml` are included in source and root output.

## Accessibility Notes

- Skip link is present.
- Navigation uses semantic links and buttons.
- Focus and hover states are preserved through the shared UI system.
- Detail pages include breadcrumbs.
- Mobile navigation and card stacking should be checked visually after major content edits.

## Quality Checks

Run before deployment:

```bash
npm install
npm run build
```

Recommended manual checks:

- homepage first impression and CTA clarity
- mobile navigation
- project form spacing and helper copy
- service detail page scanability
- footer and legal links
- analytics/form backend integration

## Roadmap

- Connect the project form to a real backend or verified Formspree endpoint.
- Replace placeholder project imagery and generic project highlights with real selected work.
- Add automated link checking and HTML validation to CI.
- Add a GitHub Actions build check.
- Expand service detail pages from static sections into source templates.
- Add richer case studies once real client-approved proof is available.

## Credits

Designed and developed for Hamro Idea by Nischhal Raj Subba.
