# Hamro Idea Website

Hamro Idea is a premium, technical web presence for a Nepal-based software and digital delivery studio serving global clients. The site showcases services, process, work, and insights with a strong emphasis on performance, clarity, and trust.

This repository contains the full frontend codebase, assets, and build pipeline.

## Project Goals

- Present Hamro Idea as a premium, technically credible partner for software delivery.
- Highlight core services: web development, custom CMS, enterprise software, website design, and branding.
- Provide fast, polished navigation with immersive mega menus and interactive elements.
- Maintain SEO-ready structure with clear headings, metadata, and content hierarchy.
- Support quick iteration through a simple build pipeline (Gulp + asset bundling).

## Key Features

- Multi-level mega menus with service-style layouts across all navigation items.
- Comprehensive page system for services, process, work, insights, and contact.
- Page transitions and micro-interactions (loading spinner, scroll reveal, back-to-top).
- Performance-first UI with optimized CSS and lightweight JS.
- Global grain texture overlay for visual depth.

## Pages and Content

Core pages:
- Home: index.html
- Services: services.html
- Solutions: solutions.html
- Work: work.html
- Process: process.html
- About: about.html
- Insights: insights.html
- Contact: contact.html

Detail pages:
- Services: services/*.html
- Work: work/*.html
- Process: process/*.html
- About: about/*.html
- Insights: insights/*.html
- Contact: contact/*.html
- Legal: privacy-policy.html, terms-of-use.html, cookie-consent.html

## Tech Stack

- HTML: static HTML output with reusable template structure.
- CSS: compiled stylesheet at assets/css/main.css.
- JS: compiled script at assets/js/all.js plus page UI enhancements.
- Build: Gulp pipeline for HTML, CSS, JS, and assets.

## Repository Structure

- index.html: homepage
- services.html, solutions.html, work.html, process.html, about.html, insights.html, contact.html
- services/, work/, process/, about/, insights/, contact/: detail pages
- assets/css/main.css: compiled styles
- assets/js/all.js: compiled JS bundle
- assets/js/page-ui.js: page interactions (spinner, scroll reveal, back-to-top)
- templates/main.html: base layout template
- organisms/: component partials (navbar, footer, hero, etc.)
- src/: source assets and JS

## Styleguide

- styleguide.html: full interactive styleguide
- styleguide-print.html: print/PDF-friendly styleguide
- STYLEGUIDE.md: repo documentation mirror

## Development

Install dependencies:

npm install

Run development build:

npm run start

Build production assets:

npm run build

The output is written to the project root and assets/ directories.

## Scripts

- npm run start: development build and watch
- npm run build: production build

Note: The gulpfile is configured to output to the root. Review gulpfile.js if you need to adjust destinations.

## SEO and Metadata

- Each page includes a unique title and meta description.
- Content hierarchy uses a single H1 per page and structured H2/H3 sections.
- Canonical URLs are set for all pages.
- Open Graph and Twitter metadata are included.

## Accessibility

- Button focus states and visible outlines are enabled.
- Semantic headings and list structures are used across sections.

## Performance Notes

- Minimal JS dependencies for navigation and animations.
- CSS is compiled and minified.
- Noise texture is applied via CSS overlay; adjust opacity in assets/css/main.css if needed.

## Customization

- Update navigation and mega menu content in templates/main.html and organisms/navbar.html.
- Edit page copy directly in each HTML file.
- Adjust global styles in assets/css/main.css.
- Update interactive behavior in assets/js/page-ui.js.

## Deployment

This is a static site. You can deploy to any static host:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Build the site first, then publish the project root.

## Troubleshooting

- If a page does not show new content, ensure the correct HTML file was edited and reloaded.
- If mega menus are missing, verify templates/main.html and organisms/navbar.html are in sync.
- If scroll or overlays behave unexpectedly, check CSS overlays in assets/css/main.css.

## Credits

Designed and conceptualized by Nischhal Raj Subba.
