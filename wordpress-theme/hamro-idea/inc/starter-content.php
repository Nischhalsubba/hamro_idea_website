<?php
/**
 * Starter content that becomes editable WordPress data.
 *
 * @package HamroIdea
 */

if (!defined('ABSPATH')) {
    exit;
}

function hamro_idea_seed_starter_content(): void
{
    if (get_option('hamro_idea_seeded_v1')) {
        return;
    }

    $service_ids = hamro_idea_seed_services();
    hamro_idea_seed_work();
    hamro_idea_seed_solutions();

    $pages = [
        'home' => ['Home', hamro_idea_home_content()],
        'services' => ['Services', hamro_idea_archive_intro_content('Services', 'Websites, web apps, CMS platforms, SEO, design, and custom software.', 'hi_service')],
        'solutions' => ['Solutions', hamro_idea_archive_intro_content('Solutions', 'Digital systems matched to your stage, team, and operating model.', 'hi_solution')],
        'work' => ['Work', hamro_idea_archive_intro_content('Selected Work', 'Project highlights across websites, CMS platforms, product interfaces, and software systems.', 'hi_work')],
        'process' => ['Process', hamro_idea_process_content()],
        'about' => ['About', hamro_idea_about_content()],
        'insights' => ['Insights', hamro_idea_archive_intro_content('Insights', 'Practical notes on websites, CMS, SEO, product design, and software delivery.', 'post')],
        'contact' => ['Contact', hamro_idea_contact_content()],
        'start-project' => ['Start Project', hamro_idea_start_project_content()],
    ];

    $page_ids = [];
    foreach ($pages as $slug => [$title, $content]) {
        $page_ids[$slug] = hamro_idea_upsert_post('page', $title, $slug, $content);
    }

    hamro_idea_seed_child_pages($page_ids);

    if (!empty($page_ids['home'])) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $page_ids['home']);
    }

    hamro_idea_seed_navigation($page_ids);
    update_option('hamro_idea_seeded_v1', current_time('mysql'));
}

function hamro_idea_upsert_post(string $post_type, string $title, string $slug, string $content, string $excerpt = '', int $parent_id = 0): int
{
    $existing = get_page_by_path($slug, OBJECT, $post_type);
    $postarr = [
        'post_type' => $post_type,
        'post_title' => $title,
        'post_name' => $slug,
        'post_content' => $content,
        'post_excerpt' => $excerpt,
        'post_status' => 'publish',
        'post_parent' => $parent_id,
    ];

    if ($existing) {
        $postarr['ID'] = $existing->ID;
        wp_update_post($postarr);
        return (int) $existing->ID;
    }

    return (int) wp_insert_post($postarr);
}

function hamro_idea_seed_services(): array
{
    $items = [
        ['Web Development', 'web-development', 'Fast, responsive websites and web apps built for conversion, SEO, and scale.'],
        ['Custom CMS', 'custom-cms', 'Publishing systems for teams that need speed, control, and clean workflows.'],
        ['Enterprise Software', 'enterprise-software', 'Secure operational platforms, dashboards, and integrations for growing teams.'],
        ['Digital Marketing & SEO', 'digital-marketing-seo', 'Technical SEO, content structure, speed, and conversion improvements.'],
        ['Branding & Identity', 'branding-identity', 'Brand foundations and interface systems for more consistent digital delivery.'],
        ['eCommerce Growth', 'ecommerce-growth', 'Commerce and CMS improvements for clearer buying and management workflows.'],
        ['Fix My SEO', 'fix-my-seo', 'Practical SEO cleanup for websites that need better structure, speed, and visibility.'],
        ['Start a New Project', 'start-a-new-project', 'A guided entry point for teams that know the goal but need help shaping scope.'],
    ];

    $ids = [];
    foreach ($items as [$title, $slug, $excerpt]) {
        $ids[] = hamro_idea_upsert_post('hi_service', $title, $slug, hamro_idea_service_content($title, $excerpt), $excerpt);
    }
    return $ids;
}

function hamro_idea_seed_child_pages(array $page_ids): void
{
    $child_pages = [
        'process' => [
            ['How We Work', 'how-we-work', hamro_idea_process_content()],
            ['Engagement Models', 'engagement-models', '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Engagement Models</h1><p class="hi-lead">Choose the collaboration model that fits your project stage, timeline, and internal capacity.</p><ol class="hi-checklist"><li>Fixed-scope website or CMS build</li><li>Product design and development sprint</li><li>Long-term support and improvement retainer</li></ol></div><!-- /wp:group -->'],
        ],
        'about' => [
            ['Company', 'company', hamro_idea_about_content()],
            ['Team', 'team', '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Team</h1><p class="hi-lead">Introduce the real Hamro Idea team, roles, and delivery responsibilities here.</p><div class="hi-card"><p>Use real names, photos, and responsibilities before publishing.</p></div></div><!-- /wp:group -->'],
            ['Why Hamro Idea', 'why-hamro-idea', '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Why Hamro Idea</h1><p class="hi-lead">Strategy-first planning, design and development in one process, and maintainable builds for teams in Nepal and beyond.</p></div><!-- /wp:group -->'],
        ],
        'insights' => [
            ['Blog', 'blog', hamro_idea_archive_intro_content('Blog', 'Practical notes on websites, CMS, SEO, product design, and software delivery.', 'post')],
            ['Resources', 'resources', '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Resources</h1><p class="hi-lead">Editable guides, checklists, and frameworks for digital product decisions.</p></div><!-- /wp:group -->'],
        ],
        'contact' => [
            ['Book a Call', 'book-a-call', hamro_idea_contact_content()],
            ['Email', 'email', hamro_idea_contact_content()],
            ['WhatsApp', 'whatsapp', hamro_idea_contact_content()],
        ],
    ];

    foreach ($child_pages as $parent_slug => $items) {
        $parent_id = $page_ids[$parent_slug] ?? 0;
        foreach ($items as [$title, $slug, $content]) {
            hamro_idea_upsert_post('page', $title, $slug, $content, '', $parent_id);
        }
    }

    hamro_idea_seed_posts();
}

function hamro_idea_seed_posts(): void
{
    $items = [
        ['Website Planning Checklist', 'website-planning-checklist', 'A practical outline for planning pages, content, SEO basics, and launch ownership.'],
        ['CMS Questions Before You Build', 'cms-questions-before-you-build', 'Questions that help teams choose a maintainable CMS structure.'],
        ['SEO Foundations For New Websites', 'seo-foundations-for-new-websites', 'Starter guidance for structure, performance, metadata, and search visibility.'],
    ];

    foreach ($items as [$title, $slug, $excerpt]) {
        hamro_idea_upsert_post('post', $title, $slug, hamro_idea_post_content($title, $excerpt), $excerpt);
    }
}

function hamro_idea_seed_work(): void
{
    $items = [
        ['Website Redesign System', 'website-redesign-system', 'A business website rebuild focused on clarity, speed, and SEO structure.'],
        ['CMS Publishing Workflow', 'cms-publishing-workflow', 'A content platform direction for easier publishing workflows.'],
        ['Operations Dashboard Interface', 'operations-dashboard-interface', 'A custom software interface planned for clearer operations.'],
    ];

    foreach ($items as [$title, $slug, $excerpt]) {
        hamro_idea_upsert_post('hi_work', $title, $slug, hamro_idea_work_content($title, $excerpt), $excerpt);
    }
}

function hamro_idea_seed_solutions(): void
{
    $items = [
        ['Startups', 'startups', 'MVP planning, launch websites, early CMS, and product validation support.'],
        ['Local Businesses', 'local-businesses', 'Trust-building websites, lead capture, content structure, and local SEO.'],
        ['Growing Companies', 'growing-companies', 'Redesigns, workflow tools, dashboards, CMS migrations, and support.'],
        ['Agencies', 'agencies', 'Frontend, CMS, and implementation support for agency delivery teams.'],
        ['Enterprises', 'enterprises', 'Custom software, platform modernization, handover, and maintainability.'],
    ];

    foreach ($items as [$title, $slug, $excerpt]) {
        hamro_idea_upsert_post('hi_solution', $title, $slug, hamro_idea_solution_content($title, $excerpt), $excerpt);
    }
}

function hamro_idea_seed_navigation(array $page_ids): void
{
    $menu_name = 'Hamro Idea Primary';
    $menu = wp_get_nav_menu_object($menu_name);
    $menu_id = $menu ? (int) $menu->term_id : (int) wp_create_nav_menu($menu_name);

    foreach (['services', 'solutions', 'work', 'process', 'about', 'insights', 'contact'] as $slug) {
        if (empty($page_ids[$slug])) {
            continue;
        }
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => get_the_title($page_ids[$slug]),
            'menu-item-object' => 'page',
            'menu-item-object-id' => $page_ids[$slug],
            'menu-item-type' => 'post_type',
            'menu-item-status' => 'publish',
        ]);
    }

    set_theme_mod('nav_menu_locations', [
        'primary' => $menu_id,
        'footer' => $menu_id,
    ]);
}

function hamro_idea_home_content(): string
{
    return <<<HTML
<!-- wp:group {"className":"hi-hero","layout":{"type":"constrained"}} -->
<div class="wp-block-group hi-hero"><!-- wp:heading {"level":1} --><h1>Design, development, and digital systems for businesses ready to grow.</h1><!-- /wp:heading -->
<!-- wp:paragraph {"className":"hi-lead"} --><p class="hi-lead">Hamro Idea helps startups, local businesses, and growing teams build high-performing websites, web apps, CMS platforms, and custom software with a clear strategy-first process.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"is-style-hamro-arrow"} --><div class="wp-block-button is-style-hamro-arrow"><a class="wp-block-button__link wp-element-button" href="/start-project/">Book a Project Call</a></div><!-- /wp:button --><!-- wp:button {"className":"is-style-hamro-ghost"} --><div class="wp-block-button is-style-hamro-ghost"><a class="wp-block-button__link wp-element-button" href="/work/">View Case Studies</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><!-- wp:heading --><h2>What We Build</h2><!-- /wp:heading --><!-- wp:query {"query":{"perPage":6,"postType":"hi_service","order":"asc","orderBy":"date"},"displayLayout":{"type":"flex","columns":3}} --><div class="wp-block-query"><!-- wp:post-template --><!-- wp:group {"className":"hi-card","layout":{"type":"constrained"}} --><div class="wp-block-group hi-card"><!-- wp:post-title {"isLink":true,"level":3} /--><!-- wp:post-excerpt /--></div><!-- /wp:group --><!-- /wp:post-template --></div><!-- /wp:query --></div><!-- /wp:group -->

<!-- wp:group {"className":"hi-section hi-section--dark","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section hi-section--dark"><!-- wp:heading --><h2>Featured Work</h2><!-- /wp:heading --><!-- wp:query {"query":{"perPage":3,"postType":"hi_work","order":"asc","orderBy":"date"},"displayLayout":{"type":"flex","columns":3}} --><div class="wp-block-query"><!-- wp:post-template --><!-- wp:group {"className":"hi-card hi-card--dark","layout":{"type":"constrained"}} --><div class="wp-block-group hi-card hi-card--dark"><!-- wp:post-title {"isLink":true,"level":3} /--><!-- wp:post-excerpt /--></div><!-- /wp:group --><!-- /wp:post-template --></div><!-- /wp:query --></div><!-- /wp:group -->

<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><!-- wp:heading --><h2>Why Hamro Idea</h2><!-- /wp:heading --><!-- wp:columns --><div class="wp-block-columns"><!-- wp:column --><div class="wp-block-column"><h3>Strategy-first planning</h3><p>We clarify goals, users, scope, and technical constraints before production.</p></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><h3>Design + development together</h3><p>UX, visual design, CMS, frontend, and backend decisions stay aligned.</p></div><!-- /wp:column --><!-- wp:column --><div class="wp-block-column"><h3>SEO and performance aware</h3><p>Builds include structure, speed basics, analytics, and handover support.</p></div><!-- /wp:column --></div><!-- /wp:columns --></div><!-- /wp:group -->
HTML;
}

function hamro_idea_archive_intro_content(string $title, string $description, string $post_type): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><!-- wp:heading {"level":1} --><h1>' . esc_html($title) . '</h1><!-- /wp:heading --><!-- wp:paragraph {"className":"hi-lead"} --><p class="hi-lead">' . esc_html($description) . '</p><!-- /wp:paragraph --><!-- wp:query {"query":{"perPage":12,"postType":"' . esc_attr($post_type) . '","order":"asc","orderBy":"date"},"displayLayout":{"type":"flex","columns":3}} --><div class="wp-block-query"><!-- wp:post-template --><!-- wp:group {"className":"hi-card","layout":{"type":"constrained"}} --><div class="wp-block-group hi-card"><!-- wp:post-title {"isLink":true,"level":2} /--><!-- wp:post-excerpt /--></div><!-- /wp:group --><!-- /wp:post-template --></div><!-- /wp:query --></div><!-- /wp:group -->';
}

function hamro_idea_process_content(): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Process</h1><p class="hi-lead">A clear path from idea to launched system.</p><ol class="hi-checklist"><li>Discover goals, users, scope, and constraints.</li><li>Design structure, flows, interface direction, and content priorities.</li><li>Build, integrate, review, and QA the production system.</li><li>Launch with SEO basics, analytics, performance checks, and handover.</li><li>Improve through support cycles and useful iteration.</li></ol></div><!-- /wp:group -->';
}

function hamro_idea_about_content(): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>A Nepal-based studio for websites, products, and software systems.</h1><p class="hi-lead">Hamro Idea works with teams that need thoughtful planning and practical digital delivery.</p><div class="hi-card"><h2>How we work</h2><p>We combine strategy, design, development, SEO awareness, and ownership-focused handover in one process.</p></div></div><!-- /wp:group -->';
}

function hamro_idea_contact_content(): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>Tell us what you want to build.</h1><p class="hi-lead">Share what you know. You do not need a complete brief.</p><!-- wp:shortcode -->[hamro_project_form]<!-- /wp:shortcode --></div><!-- /wp:group -->';
}

function hamro_idea_start_project_content(): string
{
    return hamro_idea_contact_content();
}

function hamro_idea_service_content(string $title, string $excerpt): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>' . esc_html($title) . '</h1><p class="hi-lead">' . esc_html($excerpt) . '</p><div class="hi-card"><h2>What we deliver</h2><ol class="hi-checklist"><li>Discovery and scope plan</li><li>UX, content, and technical direction</li><li>Production-ready implementation</li><li>QA, launch support, and handover</li></ol></div><!-- wp:shortcode -->[hamro_project_form]<!-- /wp:shortcode --></div><!-- /wp:group -->';
}

function hamro_idea_work_content(string $title, string $excerpt): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>' . esc_html($title) . '</h1><p class="hi-lead">' . esc_html($excerpt) . '</p><div class="hi-card"><h2>Project highlight</h2><p>This is starter content. Replace it with client-approved project context, real screenshots, and approved outcomes.</p></div></div><!-- /wp:group -->';
}

function hamro_idea_solution_content(string $title, string $excerpt): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>' . esc_html($title) . '</h1><p class="hi-lead">' . esc_html($excerpt) . '</p><div class="hi-card"><h2>Best fit</h2><p>Edit this solution page with the business problems, workflows, decision criteria, and next steps for this audience.</p></div></div><!-- /wp:group -->';
}

function hamro_idea_post_content(string $title, string $excerpt): string
{
    return '<!-- wp:group {"className":"hi-section","layout":{"type":"constrained"}} --><div class="wp-block-group hi-section"><h1>' . esc_html($title) . '</h1><p class="hi-lead">' . esc_html($excerpt) . '</p><div class="hi-card"><p>This is starter insight content. Replace it with a practical article, screenshots, checklists, or real team guidance before publishing.</p></div></div><!-- /wp:group -->';
}
