# Repository Instructions

## Setup

```bash
npm install
npm run start
```

Production build:

```bash
npm run build
```

## Architecture

- `src/`: Pug, SCSS, and JavaScript source.
- Gulp, Babel, and webpack-stream build the static output.
- Root HTML and assets support traditional static hosting.
- `public/` is prepared for Vercel after the production build.
- `STYLEGUIDE.md` defines visual direction.

## Change rules

- Prefer editing source templates and styles rather than generated output.
- Keep root output and Vercel `public/` output consistent.
- Preserve service-detail, work, process, insight, contact, legal, 404, sitemap, and robots routes.
- Avoid fake clients, metrics, testimonials, awards, or outcomes.
- Keep project enquiries disconnected or clearly marked until a verified backend exists.
- Preserve reduced-motion and visible-focus behavior.

## Verification

1. Run the production build.
2. Inspect generated root and `public/` files.
3. Test all overview and detail pages.
4. Run a link check and HTML validation.
5. Test mobile navigation, breadcrumbs, forms, legal links, sitemap, robots, and 404.
6. Verify metadata, canonicals, Open Graph, and structured data.
7. Confirm no placeholder endpoint receives user data.

## Do not

- Do not edit generated files without reflecting the source change.
- Do not connect forms to unverified endpoints.
- Do not publish generic case studies as client work.
- Do not present the repository thumbnail as a runtime screenshot.