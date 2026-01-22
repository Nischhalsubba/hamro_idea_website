# Hamro Idea Styleguide

A comprehensive design system reference for the Hamro Idea marketing website. This mirrors `styleguide.html` and includes brand foundations, typography, tokens, components, accessibility, and governance.

## 1. Overview + Operating Rules

- Purpose: Premium credibility and technical confidence for companies and founders with ambitious ideas.
- Scope: Marketing website (Home, Services, Solutions, Work, Process, About, Insights, Contact, Legal, 404/500).
- Audience: Design, engineering, content, SEO, QA, and stakeholders.
- Principles: Clarity over clever. One primary action per section. Performance first. Trust over noise.
- Source of truth: CSS in `assets/css/main.css`, templates in `templates/main.html`, components in `organisms/`.

## 2. Brand Foundations

- Logo system: Primary logo, icon mark, and favicon. Keep clear space equal to the logo icon width. Minimum size: 120px wide for header.
- Color intent: Navy anchors credibility, indigo drives action, magenta highlights premium details, gold signals priority.
- Typography identity: Manrope is the only brand typeface. Clean, modern, technical.
- Imagery direction: High-contrast, crisp UI/product visuals, minimal clutter, generous negative space.
- Iconography: Simple geometric icons, consistent stroke, used to guide navigation and scanability.
- Motion tone: Confident and subtle. Motion clarifies hierarchy and interaction feedback.

## 3. Typography System

- Font stack: Manrope, sans-serif.
- Max line length: 70-80 characters for long-form text.

| Token | Size | Usage |
| --- | --- | --- |
| type.display | clamp(2.6rem-3.6rem) | Hero headlines (H1) |
| type.h2 | clamp(2rem-2.8rem) | Section headings |
| type.h3 | 1.25rem-1.35rem | Card titles |
| type.body | 1rem-1.1rem | Body text |
| type.caption | .75rem-.85rem | Eyebrow labels |

## 4. Tokens: Color + Layout

### Color Tokens

- color.navy.900: #0a0e3a
- color.indigo.700: #121984
- color.accent.magenta: #ff009a
- color.accent.gold: #ffbe2c
- color.surface.light: #f6f4fc
- color.surface.white: #fcfcfc
- color.surface.frost: #e4e6f5
- color.text.body: #4a4a4c

### Spacing Scale

- space.8, space.16, space.24, space.32, space.48, space.64, space.96

### Layout + Grid

| Breakpoint | Container Width | Usage |
| --- | --- | --- |
| 768px | 750px | Tablet layout |
| 992px | 970px | Desktop base |
| 1400px | 1320px | Large desktop |
| 1600px | 1440px | XL desktop |

### Radius + Elevation

- Radius range: 4px (buttons) to 22px (hero panels).
- Card elevation: 0 18px 40px rgba(18,25,132,.08).
- Hover elevation: +8px translate with stronger shadow.
- Dividers: rgba(18,25,132,.08) for light surfaces.

## 5. Texture + Atmosphere

- Global noise overlay: body::before (fixed, full-page).
- Section noise wash: section::before for local texture.
- Mix-blend-mode: overlay + soft-light for subtle grain.
- Noise overlay lives in `assets/css/main.css`.

## 6. Motion + Interaction

- Durations: Fast 0.2s, Standard 0.3s, Emphasis 0.6s.
- Easing: Standard ease/cubic-bezier for interactive transitions.
- Allowed motion: Hover lifts, button hover, reveal on scroll, page glow.
- Reduced motion: Disable keyframes and reveal effects when user prefers reduced motion.

## 7. Iconography + Imagery

- Icon sizes: 16, 20, 24, 32, 48px.
- Use filled icons in mega menu and service cards.
- Imagery uses clean gradients and high-contrast UI shots.

## 8. Atomic Elements

- Typography + Links
- Badges + Chips
- Buttons
- Form Controls
- Lists + Dividers

## 9. Component Library (Live References)

- [Service Cards](services.html)
- [Signature Cards](about.html)
- [Featured Work Cards](work.html)
- [Timeline + Process](process.html)
- [CTA Section](contact.html)

## 10. Section Library

- Hero (value prop + CTA, split layout)
- Problem -> Solution
- Feature grid
- Process timeline
- Case study highlights
- Metrics band
- FAQ
- Final CTA

## 11. Page Templates

- Home: hero + services + proof + CTA
- Services overview: hero + outcomes + process + CTA
- Service detail: hero + deliverables + proof + CTA
- Work listing: hero + featured work + case studies
- Case study: hero + challenge + results + CTA
- Insights: blog listing + CTA
- Contact: hero + contact options + CTA
- Legal: hero + policy blocks

## 12. Accessibility Standards

- Visible focus rings for all interactive elements.
- One H1 per page with logical H2/H3 hierarchy.
- Buttons for actions, links for navigation.
- Alt text for meaningful imagery; empty alt for decorative visuals.
- Reduced motion respects user preferences.

## 13. Content Styleguide

- Voice: Confident, technical, and direct. Avoid hype and vague claims.
- CTA rules: Verb + outcome ("Book a Call", "View Case Studies").
- Error copy: Explain what happened + how to fix it.
- Editorial: Use short paragraphs, clear headings, and purposeful lists.

## 14. SEO Standards

- One H1 per page with descriptive keywords.
- Meta title + description unique per page.
- Canonical URL set for every page.
- Internal links from nav, CTA, and related sections.
- Meaningful alt text for non-decorative images.

## 15. Performance + Media

- Use SVG for icons and UI graphics.
- Optimize hero media; avoid heavy videos.
- Limit font weights to reduce load.
- Respect reduced motion preferences.

## 16. Analytics + Instrumentation

- Primary CTA clicks per page.
- Form submit success/failure.
- Outbound link clicks for partners.
- Optional scroll depth for long-form content.

## 17. QA Checklists

- Visual QA: Spacing uses tokens, typography consistent, alignment clean.
- Responsive QA: Headers, nav, cards, and footers work at all breakpoints.
- Accessibility QA: Keyboard navigation, focus visibility, contrast pass.
- SEO QA: Unique meta, correct headings, OG tags present.

## 18. Engineering Implementation

- Tokens live in `assets/css/main.css`.
- Templates in `templates/main.html`.
- Components in `organisms/` and page HTML files.
- Interaction logic in `assets/js/page-ui.js`.

## 19. Governance + Changelog

- Owners: Design + Engineering + QA.
- Change process: request -> review -> ship -> document.
- Document changes in README or release notes.
- Audit cadence: quarterly visual and SEO review.
