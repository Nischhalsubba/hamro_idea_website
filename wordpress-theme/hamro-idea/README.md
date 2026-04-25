# Hamro Idea WordPress Theme

Block theme conversion of the Hamro Idea static marketing website.

## What This Theme Provides

- Full Site Editing support with `theme.json`, block templates, and editable template parts.
- Dynamic custom post types for Services, Work, and Solutions.
- Editable pages for Home, Services, Solutions, Work, Process, About, Insights, Contact, and Start Project.
- Starter content seeded on theme activation so the site has useful real-world structure without fake metrics or fake testimonials.
- Reusable block patterns for the hero, service grid, and final project CTA.
- A static lead form shortcode: `[hamro_project_form]`.

## Installation

1. Copy `wordpress-theme/hamro-idea` into `wp-content/themes/hamro-idea`.
2. Activate **Hamro Idea** in WordPress.
3. Go to **Settings > Permalinks** and save once.
4. Edit templates in **Appearance > Editor**.
5. Manage dynamic content from **Services**, **Work**, and **Solutions** in the WordPress admin.

## Notes

- This theme keeps the existing Hamro Idea visual direction by reusing the compiled static CSS and assets.
- The project form sends email with `wp_mail()`. Configure SMTP in production for reliable delivery.
- Replace starter content, logos, and work examples with real business content before launch.
