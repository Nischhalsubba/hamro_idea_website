<?php
/**
 * Shortcodes for dynamic project inquiry flows.
 *
 * @package HamroIdea
 */

if (!defined('ABSPATH')) {
    exit;
}

add_shortcode('hamro_project_form', 'hamro_idea_project_form_shortcode');
function hamro_idea_project_form_shortcode(): string
{
    $status = sanitize_key($_GET['inquiry'] ?? '');

    ob_start();
    ?>
    <form class="project-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="hamro_project_inquiry">
        <?php wp_nonce_field('hamro_project_inquiry', 'hamro_project_nonce'); ?>
        <?php if ('sent' === $status) : ?>
            <p class="project-form__status project-form__status--success"><?php esc_html_e('Thanks - your project details were received. We will review the scope and reply with next steps.', 'hamro-idea'); ?></p>
        <?php elseif ('invalid' === $status) : ?>
            <p class="project-form__status project-form__status--error"><?php esc_html_e('Something went wrong. Please check required fields or email us directly.', 'hamro-idea'); ?></p>
        <?php endif; ?>

        <div class="form-section">
            <div class="form-section__header">
                <h3><?php esc_html_e('Project Basics', 'hamro-idea'); ?></h3>
                <p><?php esc_html_e('Share what you know. You do not need a complete brief.', 'hamro-idea'); ?></p>
            </div>
            <div class="project-form__grid">
                <label class="form-field"><?php esc_html_e('Name', 'hamro-idea'); ?><input name="name" type="text" required></label>
                <label class="form-field"><?php esc_html_e('Email', 'hamro-idea'); ?><input name="email" type="email" required></label>
                <label class="form-field"><?php esc_html_e('Company', 'hamro-idea'); ?><input name="company" type="text"></label>
                <label class="form-field"><?php esc_html_e('Website', 'hamro-idea'); ?><input name="website" type="url"></label>
            </div>
        </div>

        <div class="form-section">
            <div class="form-section__header">
                <h3><?php esc_html_e('Project Details', 'hamro-idea'); ?></h3>
                <p><?php esc_html_e('Budget helps us recommend the right scope. It does not need to be exact.', 'hamro-idea'); ?></p>
            </div>
            <div class="project-form__grid">
                <label class="form-field"><?php esc_html_e('Project Type', 'hamro-idea'); ?>
                    <select name="project_type" required>
                        <option value=""><?php esc_html_e('Select one', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('Website', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('Web App', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('Custom Software', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('CMS/eCommerce', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('Branding', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('SEO', 'hamro-idea'); ?></option>
                        <option><?php esc_html_e('Not sure yet', 'hamro-idea'); ?></option>
                    </select>
                </label>
                <label class="form-field"><?php esc_html_e('Timeline', 'hamro-idea'); ?><input name="timeline" type="text" placeholder="Example: 1-3 months"></label>
                <label class="form-field"><?php esc_html_e('Budget Range', 'hamro-idea'); ?><input name="budget" type="text" placeholder="Example: $5k-$15k"></label>
            </div>
            <label class="form-field form-field--full"><?php esc_html_e('What do you want to build or improve?', 'hamro-idea'); ?><textarea name="message" required></textarea></label>
        </div>

        <div class="form-actions">
            <button class="btn btn--icon-block" type="submit" data-loading-label="<?php esc_attr_e('Sending your project details...', 'hamro-idea'); ?>"><span class="text"><?php esc_html_e('Send Project Details', 'hamro-idea'); ?></span><span class="btn-icon-box">-&gt;</span></button>
        </div>
    </form>
    <?php
    return (string) ob_get_clean();
}

add_action('admin_post_nopriv_hamro_project_inquiry', 'hamro_idea_handle_project_inquiry');
add_action('admin_post_hamro_project_inquiry', 'hamro_idea_handle_project_inquiry');
function hamro_idea_handle_project_inquiry(): void
{
    if (!isset($_POST['hamro_project_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['hamro_project_nonce'])), 'hamro_project_inquiry')) {
        wp_safe_redirect(add_query_arg('inquiry', 'invalid', wp_get_referer() ?: home_url('/contact/')));
        exit;
    }

    $fields = [
        'name' => sanitize_text_field(wp_unslash($_POST['name'] ?? '')),
        'email' => sanitize_email(wp_unslash($_POST['email'] ?? '')),
        'company' => sanitize_text_field(wp_unslash($_POST['company'] ?? '')),
        'website' => esc_url_raw(wp_unslash($_POST['website'] ?? '')),
        'project_type' => sanitize_text_field(wp_unslash($_POST['project_type'] ?? '')),
        'timeline' => sanitize_text_field(wp_unslash($_POST['timeline'] ?? '')),
        'budget' => sanitize_text_field(wp_unslash($_POST['budget'] ?? '')),
        'message' => sanitize_textarea_field(wp_unslash($_POST['message'] ?? '')),
    ];

    $body = '';
    foreach ($fields as $label => $value) {
        $body .= ucwords(str_replace('_', ' ', $label)) . ': ' . $value . "\n";
    }

    wp_mail(get_option('admin_email'), 'New Hamro Idea project inquiry', $body, ['Reply-To: ' . $fields['email']]);
    wp_safe_redirect(add_query_arg('inquiry', 'sent', wp_get_referer() ?: home_url('/contact/')));
    exit;
}
