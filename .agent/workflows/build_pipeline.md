---
description: Build and verify the project assets (HTML, CSS, JS).
---

This workflow automates the build process to ensure consistency across Pug, SCSS, and JS changes.

1. **Clean and Rebuild**
   - Clean the `dist` directory and rebuild all assets.
   // turbo
   `npx gulp build`

2. **Verify Vital Assets**
   - Check for the existence of compiled files.
   `ls -la dist/index.html dist/assets/css/main.css dist/assets/js/all.js`
