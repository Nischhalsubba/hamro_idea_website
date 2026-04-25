<?php
/**
 * Custom post types for dynamic studio content.
 *
 * @package HamroIdea
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'hamro_idea_register_post_types');
function hamro_idea_register_post_types(): void
{
    $types = [
        'hi_service' => [
            'singular' => 'Service',
            'plural' => 'Services',
            'slug' => 'services',
            'icon' => 'dashicons-admin-tools',
        ],
        'hi_work' => [
            'singular' => 'Work',
            'plural' => 'Work',
            'slug' => 'work',
            'icon' => 'dashicons-portfolio',
        ],
        'hi_solution' => [
            'singular' => 'Solution',
            'plural' => 'Solutions',
            'slug' => 'solutions',
            'icon' => 'dashicons-lightbulb',
        ],
    ];

    foreach ($types as $post_type => $config) {
        register_post_type($post_type, [
            'labels' => [
                'name' => __($config['plural'], 'hamro-idea'),
                'singular_name' => __($config['singular'], 'hamro-idea'),
                'add_new_item' => sprintf(__('Add New %s', 'hamro-idea'), $config['singular']),
                'edit_item' => sprintf(__('Edit %s', 'hamro-idea'), $config['singular']),
            ],
            'public' => true,
            'show_in_rest' => true,
            'menu_icon' => $config['icon'],
            'has_archive' => true,
            'rewrite' => ['slug' => $config['slug']],
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'],
            'template' => [
                ['core/paragraph', ['placeholder' => 'Describe the business problem, deliverables, process, and next step.']],
            ],
        ]);
    }
}

add_action('init', 'hamro_idea_register_taxonomies');
function hamro_idea_register_taxonomies(): void
{
    register_taxonomy('hi_capability', ['hi_service', 'hi_work', 'hi_solution'], [
        'labels' => [
            'name' => __('Capabilities', 'hamro-idea'),
            'singular_name' => __('Capability', 'hamro-idea'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'capability'],
    ]);
}

