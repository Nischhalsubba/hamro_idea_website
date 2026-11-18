# Hamro Idea — build and publishing acceptance

## Repository-specific entry point
The source and build tooling live in `workspace/`, not repository root. Its `package.json` declares `npm start` (Gulp dev task), `npm run build` (Gulp build followed by `scripts/prepare-public.js`), and `npm run build:root` (Gulp only). The package targets a static marketing website. These commands are observations from the manifest, not evidence that a particular hosting platform is configured.

## Reproducible local workflow
```bash
git clone https://github.com/Nischhalsubba/hamro_idea_website.git
cd hamro_idea_website/workspace
npm install
npm start
# In a separate session when ready to package:
npm run build
```

Prefer `npm ci` over `npm install` **if a compatible committed lockfile is present**. Do not silently generate or replace a lockfile while reviewing an unrelated content change. Legacy build dependencies may require an explicitly documented compatible Node version; the package only declares Node `>=10`, not a tested current release.

## Source versus deployment artifact
- Edit the appropriate maintained source inside `workspace/`; identify it before changing generated output.
- Inspect what `gulp build` produces and what `scripts/prepare-public.js` copies, rewrites, or removes.
- Confirm deployment is configured for the **actual generated output**; never assume `/dist`, `/public`, or repository root without evidence.
- Keep paths and asset casing portable across case-sensitive hosting environments.
- Avoid hand-editing generated files unless the published artifact itself is the confirmed source of truth.

## Acceptance checklist
1. Capture runtime versions, install outcome, and exact build command.
2. Verify compiled HTML/CSS/JS and referenced fonts/images exist in the intended publish directory.
3. Open generated pages via a local static server; inspect navigation, CTA destinations, console errors and layout at mobile widths.
4. Confirm page titles, descriptions, accessible link text, alt attributes and reduced-motion behavior for GSAP/animation.
5. For client-facing statements (services, locations, staff, results), obtain owner-approved facts; remove template content.
6. Compare source and emitted file structure so obsolete output does not leak into deployment.
7. Require deployment logs and a live-url smoke test before reporting release success.

## Evidence record
```text
Commit / reviewer:
Node / npm versions:
Installation method and outcome:
Build command and exit code:
Source entry and produced publish path:
Files, links and mobile QA results:
Deployment provider, configuration and published URL:
Live check timestamp / result:
Issues, severity, owner:
Rollback reference:
```

## Non-goals
This document does not change the build, claim that an existing deployment is healthy, or mandate a specific hosting provider. If the current environment cannot build, capture the exact error and leave implementation changes to a focused PR.
