---
name: strapi-migration
description: Plan and execute migration of a static HTML site to dynamic content powered by Strapi, using plain HTML + JS fetch. Covers content modeling, data migration, API usage, and deployment choices.
---

# Strapi Migration Skill (Static HTML + JS Fetch)

Use this skill when converting a static HTML site into a fully dynamic site backed by Strapi CMS, with no framework (plain HTML + JS fetch).

## Quick Start (Decision Checklist)

Before changing code, confirm:
- Hosting: free tier or low-cost hosting for Strapi (Render, Railway, Fly, or self-host).
- Database: SQLite (dev) vs PostgreSQL (prod).
- API style: REST (default) vs GraphQL.
- Public access: which content is public vs protected.

## Workflow

### 1) Content Inventory

- Enumerate every page and list its content blocks.
- Identify repeated sections (hero, CTA, footer, mega menus).
- Mark all images, icons, and assets for migration.

Deliverable: content inventory list by page and section.

### 2) Data Model (Strapi)

Create Strapi content types:

**Single Types** (one entry only)
- Site Settings: brand name, tagline, logo, primary colors, CTA labels, default meta.
- Navigation: menu items, mega menu blocks, CTA links.
- Footer: columns, links, social handles, contact info.
- Homepage: hero, featured work, proof, CTA, etc.

**Collection Types**
- Services: title, slug, summary, sections, metrics, CTA.
- Solutions: title, slug, summary, sections.
- Work/Projects: title, slug, summary, industry, metrics, challenge/solution/results.
- Process Steps: step title, summary, order, icon.
- Insights/Blog: title, slug, excerpt, body, author, tags.
- Resources: title, category, links.
- Legal Pages: title, slug, body.

Fields to include:
- `title`, `slug`, `excerpt`, `body`, `sections[]`, `cta`, `seo`.
- `seo`: metaTitle, metaDescription, ogImage.
- `media`: images with alt text.

Deliverable: Strapi model map by page and collection.

### 3) Content Migration

- For each HTML page, extract content into structured JSON matching your Strapi fields.
- Load content via Strapi admin or import APIs.
- Verify URLs and slugs match existing links.

Deliverable: content fully entered in Strapi.

### 4) Frontend Integration (Plain HTML + JS Fetch)

Pattern for each page:
1. Fetch JSON from Strapi API.
2. Populate DOM nodes with content.
3. Replace static text with dynamic content.

Minimal fetch example:

```html
<script>
  fetch('https://your-strapi-url/api/services?populate=*')
    .then((res) => res.json())
    .then((data) => {
      // Inject data into page
    });
</script>
```

Rules:
- Use `data-*` hooks in HTML for each section.
- Keep layout and CSS unchanged; replace only text/media.
- Use `populate=*` for relational content.

Deliverable: all HTML pages dynamic via Strapi API.

### 5) Deployment

For free hosting (recommended):
- Render (free web service + Postgres)
- Railway (free tier + Postgres)
- Fly.io (free allowances)

Notes:
- GitHub Pages cannot run Strapi (requires Node server + database).
- Host frontend on GitHub Pages; host Strapi separately.

Deliverable: Strapi hosted and publicly reachable.

### 6) QA

- Verify content loads on all pages.
- Validate SEO fields on key pages.
- Check nav/mega menu links.
- Ensure images load with correct alt text.

Deliverable: all pages dynamic, no missing content.

## Usage Notes

- Prefer REST for simplicity.
- Keep JSON responses cached when possible.
- Avoid large nested responses in production (use selective populate).

## When to Extend

If you add multilingual content, dynamic auth, or live preview, update the models and API usage accordingly.
