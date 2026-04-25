# Hamro Idea Website

> A premium technical marketing website for **Hamro Idea** — a Nepal-based software and digital delivery studio serving founders, startups, enterprises, and global clients.

[![Static Website](https://img.shields.io/badge/Output-Static%20HTML-111111?style=for-the-badge)](#deployment)
[![Gulp](https://img.shields.io/badge/Build-Gulp%204-CF4647?style=for-the-badge&logo=gulp&logoColor=white)](#development)
[![SCSS](https://img.shields.io/badge/Styles-SCSS%20%2B%20CSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](#tech-stack)
[![SEO](https://img.shields.io/badge/Focus-SEO%20%2B%20Accessibility-0F766E?style=for-the-badge)](#seo--accessibility)

---

## Quick Navigation

<details open>
  <summary><strong>Project Docs</strong></summary>

  | Document | Purpose |
  |---|---|
  | [README](#hamro-idea-website) | Main project documentation |
  | [STYLEGUIDE.md](STYLEGUIDE.md) | Visual system and brand/style documentation |
  | [styleguide.html](styleguide.html) | Interactive browser styleguide |
  | [styleguide-print.html](styleguide-print.html) | Print/PDF-friendly styleguide |

</details>

---

## Table of Contents

- [Overview](#overview)
- [Project Goals](#project-goals)
- [Designer's Perspective](#designers-perspective)
- [Audience](#audience)
- [Features](#features)
- [Information Architecture](#information-architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Build System](#build-system)
- [Design System Direction](#design-system-direction)
- [Navigation and Page System](#navigation-and-page-system)
- [SEO + Accessibility](#seo--accessibility)
- [Performance](#performance)
- [Development](#development)
- [Scripts](#scripts)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Quality Checklist](#quality-checklist)
- [Roadmap](#roadmap)
- [Credits](#credits)

---

## Overview

**Hamro Idea Website** is a static marketing website for Hamro Idea, a Nepal-based software and digital delivery studio. The site is designed to position Hamro Idea as a professional, technically credible partner for companies and founders who need software development, custom CMS solutions, enterprise software, branding, and digital product support.

The project uses a Gulp-based front-end workflow with static HTML output, compiled CSS, bundled JavaScript, templates, organisms, and source folders. It is built to work as a polished website while still keeping the structure understandable for future design and front-end changes.

The website is not just a homepage. It includes a full page system for services, solutions, work, process, about, insights, contact, legal pages, and multiple detail pages.

---

## Project Goals

The main goals are:

1. Communicate trust and technical credibility.
2. Present Hamro Idea as a serious digital delivery partner.
3. Explain services and process clearly.
4. Support project/case-study storytelling.
5. Keep the front end fast and SEO-friendly.
6. Maintain a strong visual styleguide for consistency.
7. Make the website scalable across multiple static pages.
8. Keep the codebase friendly for design-led editing and front-end iteration.

---

## Designer's Perspective

This project is written and structured from a designer-builder perspective.

The site cares about:

- first impression
- navigation clarity
- service discoverability
- page hierarchy
- trust signals
- consistent spacing
- reusable components
- content quality
- SEO readability
- accessibility basics
- performance-conscious visual design

A software company website needs to feel capable, modern, and trustworthy. This means the design should not only look good; it should help visitors understand what the company does, who it serves, how it works, and why they should contact the team.

---

## Audience

The website is written for:

- founders with validated ideas
- startup teams planning MVPs or product builds
- companies needing custom CMS or web systems
- enterprises looking for software delivery support
- businesses needing branding and digital product design
- international clients evaluating Nepal-based technical partners

The copy and page structure should help these audiences move from interest to confidence.

---

## Features

- Static multi-page website.
- Gulp 4 build workflow.
- SCSS/CSS pipeline support.
- JavaScript bundling through project scripts.
- Unified mega-menu navigation.
- Services, solutions, work, process, about, insights, and contact pages.
- Detail page folders for deeper content.
- Micro-interactions such as scroll reveals, hover states, page spinner, and back-to-top behavior.
- Noise texture overlay for subtle visual depth.
- Dedicated styleguide in HTML, print/PDF, and Markdown formats.
- SEO-minded heading and content structure.
- Accessibility-minded navigation, focus, and semantic rules.

---

## Information Architecture

### Core Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage with positioning, trust, services, work highlights, and CTA |
| `services.html` | Main service overview |
| `solutions.html` | Solution-focused entry point |
| `work.html` | Portfolio/case-study overview |
| `process.html` | Delivery process and working method |
| `about.html` | Company background and philosophy |
| `insights.html` | Blog/thought leadership index |
| `contact.html` | Contact and lead capture page |

### Detail Pages

| Folder | Purpose |
|---|---|
| `services/` | Individual service pages |
| `work/` | Case-study/project detail pages |
| `process/` | Process-specific pages |
| `about/` | About/company subpages |
| `insights/` | Article/detail pages |
| `contact/` | Contact journey pages, such as book-a-call |

### Legal Pages

- `privacy-policy.html`
- `terms-of-use.html`
- `cookie-consent.html`

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | HTML | Static page output |
| Styles | CSS / SCSS | Runtime CSS plus source styling workflow |
| Scripts | JavaScript | Bundled in files such as `assets/js/all.js` and page-specific UI logic |
| Build | Gulp 4 | Development, watch, and production build workflow |
| Dev Server | BrowserSync | Local preview and live reload through Gulp workflow |
| JS Tooling | Babel / webpack-stream | Modern JS handling support |
| CSS Tooling | Sass, Autoprefixer, CleanCSS | Style compilation and optimization |
| Assets | Imagemin | Image optimization support |
| Motion | GSAP | Interaction and animation support |

---

## Repository Structure

```text
.
├── index.html
├── services.html
├── solutions.html
├── work.html
├── process.html
├── about.html
├── insights.html
├── contact.html
├── privacy-policy.html
├── terms-of-use.html
├── cookie-consent.html
├── services/
├── work/
├── process/
├── about/
├── insights/
├── contact/
├── assets/
│  ├── css/
│  ├── js/
│  └── images/
├── templates/
├── organisms/
├── src/
├── styleguide.html
├── styleguide-print.html
├── STYLEGUIDE.md
├── package.json
└── README.md
```

---

## Build System

This project is based on a Gulp 4 workflow. The `package.json` includes scripts for development and production builds:

```json
{
  "start": "gulp",
  "build": "gulp build"
}
```

The build stack includes tools for:

- Sass compilation
- Less/Stylus support if needed
- Babel transpilation
- BrowserSync local server
- sourcemaps
- CSS minification
- JS uglification
- image optimization
- file watching
- template/source asset workflow

This means the project is more structured than a plain static folder, even though the final website output is static HTML/CSS/JS.

---

## Design System Direction

The visual direction is premium, technical, and modern.

### Design Principles

- clarity over visual noise
- trust-first layout
- consistent navigation patterns
- strong spacing and hierarchy
- reusable components
- practical SEO copy
- modern but not overly trendy visual language
- accessible interactive states

### Visual Elements

- noise texture overlay
- structured hero sections
- cards and content modules
- consistent CTAs
- mega-menu navigation
- service and process blocks
- case-study layouts
- styleguide-backed UI decisions

---

## Navigation and Page System

The website uses a unified navigation pattern with mega-menu behavior.

Important navigation files/areas include:

- `templates/main.html`
- `organisms/navbar.html`

When editing navigation, keep these files aligned so the site does not drift between template and rendered page behavior.

---

## SEO + Accessibility

### SEO Rules

- Use one H1 per page.
- Align H1 with the page's main topic.
- Write unique page titles and meta descriptions.
- Use H2/H3 hierarchy properly.
- Add internal links from key sections and CTAs.
- Keep service pages specific and useful.
- Avoid thin or duplicated content.
- Use descriptive alt text for meaningful images.

### Accessibility Rules

- Keep visible focus states.
- Ensure mega menus are keyboard-friendly.
- Use semantic HTML.
- Use real buttons for actions and links for navigation.
- Provide alt text for meaningful images.
- Respect reduced motion where possible.
- Keep contrast strong across sections.

---

## Performance

Performance choices include:

- SVG icons and lightweight UI graphics
- optimized hero assets
- limited font weights
- compiled/minified production assets
- reduced heavy media above the fold
- static hosting compatibility
- direct HTML output for crawlability

### Performance Checklist

- [ ] Compress large images.
- [ ] Avoid heavy autoplay video above the fold.
- [ ] Minify production CSS and JS.
- [ ] Remove unused vendor scripts if not needed.
- [ ] Test mobile page speed.
- [ ] Confirm Gulp build output is production-ready.

---

## Development

Install dependencies:

```bash
npm install
```

Start development/watch mode:

```bash
npm run start
```

Build production assets:

```bash
npm run build
```

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run start` | Runs Gulp development workflow and watch tasks |
| `npm run build` | Runs production build task |

---

## Customization

| Area | File / Folder |
|---|---|
| Navigation | `templates/main.html`, `organisms/navbar.html` |
| Global styles | `assets/css/main.css` |
| Page UI interactions | `assets/js/page-ui.js` |
| Main bundled scripts | `assets/js/all.js` |
| Static content | Individual HTML pages |
| Source files | `src/`, `templates/`, `organisms/` |
| Style documentation | `STYLEGUIDE.md`, `styleguide.html`, `styleguide-print.html` |

---

## Deployment

This is a static website. It can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- traditional static hosting

### General Deployment Flow

```bash
npm install
npm run build
```

Then deploy the production-ready static files according to your hosting platform.

If deploying the current root output directly, confirm all relative asset paths work after deployment.

---

## Troubleshooting

| Issue | Check |
|---|---|
| Page looks outdated | Hard refresh and confirm correct HTML file was edited |
| Mega menu missing | Sync `templates/main.html` with `organisms/navbar.html` |
| CSS not updating | Confirm build/watch task is running |
| JS interactions broken | Check `assets/js/page-ui.js` and bundled `all.js` |
| Deployment has missing assets | Check relative file paths and folder casing |
| Build fails | Confirm Node/npm compatibility and dependency installation |

---

## Quality Checklist

### Design QA

- [ ] Homepage communicates the company value clearly.
- [ ] Services are easy to understand.
- [ ] Work/case-study sections feel credible.
- [ ] Mega menus feel consistent across pages.
- [ ] Contact CTAs are visible.
- [ ] Styleguide and live pages match.

### Content QA

- [ ] Copy is specific to Hamro Idea.
- [ ] Service claims are realistic.
- [ ] Case-study/project copy is accurate.
- [ ] No placeholder text remains.
- [ ] Legal pages are reviewed before production.
- [ ] Contact details are correct.

### Technical QA

- [ ] `npm install` works.
- [ ] `npm run start` works.
- [ ] `npm run build` works.
- [ ] No broken internal links.
- [ ] Assets load after deployment.
- [ ] Console is clear of critical errors.
- [ ] Mobile navigation works.

---

## Roadmap

- Add form backend integration.
- Add automated link checking.
- Add sitemap and robots generation if not already handled.
- Add responsive image pipeline.
- Add WebP/AVIF image variants.
- Add accessibility audit workflow.
- Add content source strategy if the site grows.
- Improve case-study detail pages with real outcomes and process stories.
- Add CI build check for deployment safety.

---

## Credits

Designed and conceptualized by **Nischhal Raj Subba**.

---

## License and Usage

This repository is intended for Hamro Idea website development and portfolio/client-style presentation. Do not reuse brand-specific copy, visual identity, or business content without permission.
