<?php
/**
 * Hamro Idea theme functions.
 *
 * @package HamroIdea
 */

if (!defined('ABSPATH')) {
    exit;
}

define('HAMRO_IDEA_VERSION', '1.0.0');
define('HAMRO_IDEA_DIR', get_template_directory());
define('HAMRO_IDEA_URI', get_template_directory_uri());

require_once HAMRO_IDEA_DIR . '/inc/post-types.php';
require_once HAMRO_IDEA_DIR . '/inc/shortcodes.php';
require_once HAMRO_IDEA_DIR . '/inc/starter-content.php';

add_action('after_setup_theme', 'hamro_idea_setup');
function hamro_idea_setup(): void
{
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'script', 'search-form', 'style']);
    add_theme_support('custom-logo', [
        'height' => 72,
        'width' => 220,
        'flex-height' => true,
        'flex-width' => true,
    ]);
    add_editor_style([
        'assets/css/main.css',
        'assets/css/wp-theme.css',
    ]);

    register_nav_menus([
        'primary' => __('Primary Navigation', 'hamro-idea'),
        'footer' => __('Footer Navigation', 'hamro-idea'),
    ]);
}

add_action('wp_enqueue_scripts', 'hamro_idea_assets');
function hamro_idea_assets(): void
{
    wp_enqueue_style(
        'hamro-idea-fonts',
        'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'hamro-idea-main',
        HAMRO_IDEA_URI . '/assets/css/main.css',
        ['hamro-idea-fonts'],
        HAMRO_IDEA_VERSION
    );

    wp_enqueue_style(
        'hamro-idea-wordpress',
        HAMRO_IDEA_URI . '/assets/css/wp-theme.css',
        ['hamro-idea-main'],
        HAMRO_IDEA_VERSION
    );

    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true);
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', ['gsap'], '3.12.5', true);
    wp_enqueue_script('hamro-idea-bundle', HAMRO_IDEA_URI . '/assets/js/all.js', ['gsap', 'gsap-scrolltrigger'], HAMRO_IDEA_VERSION, true);
    wp_enqueue_script('hamro-idea-page-ui', HAMRO_IDEA_URI . '/assets/js/page-ui.js', ['hamro-idea-bundle'], HAMRO_IDEA_VERSION, true);
    wp_add_inline_script(
        'hamro-idea-page-ui',
        "document.addEventListener('submit',function(event){var form=event.target.closest('.project-form');if(!form)return;var button=form.querySelector('button[type=\"submit\"]');if(!button)return;var label=button.getAttribute('data-loading-label');if(label){button.querySelector('.text').textContent=label;}button.disabled=true;});"
    );
}

add_action('wp_head', 'hamro_idea_print_schema');
function hamro_idea_print_schema(): void
{
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'Hamro Idea',
        'url' => home_url('/'),
        'logo' => HAMRO_IDEA_URI . '/assets/images/Logo-dark.png',
        'description' => 'Nepal-based software, web development, CMS, and digital product studio.',
    ];
    echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>' . "\n";
}

add_action('init', 'hamro_idea_register_block_styles');
function hamro_idea_register_block_styles(): void
{
    register_block_style('core/button', [
        'name' => 'hamro-arrow',
        'label' => __('Hamro Arrow CTA', 'hamro-idea'),
    ]);

    register_block_style('core/button', [
        'name' => 'hamro-ghost',
        'label' => __('Hamro Ghost CTA', 'hamro-idea'),
    ]);

    register_block_pattern_category('services', [
        'label' => __('Services', 'hamro-idea'),
    ]);
}

add_action('after_switch_theme', 'hamro_idea_after_switch');
function hamro_idea_after_switch(): void
{
    hamro_idea_register_post_types();
    hamro_idea_seed_starter_content();
    flush_rewrite_rules();
}
