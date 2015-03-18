<?php

function business_theme_setup() {
	// Theme Setup
	load_theme_textdomain( 'business', get_template_directory() . '/lang' );
	
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

	remove_action ('wp_head', 'wp_generator');
	remove_action ('wp_head', 'rsd_link');
	remove_action ('wp_head', 'wlwmanifest_link');
	remove_action ('wp_head', 'wp_shortlink_wp_head');
}

add_action( 'after_setup_theme', 'business_theme_setup' );

function business_theme_scripts(){
	// Theme Scripts and Styles
	if ( !is_admin() ) {
		// Register Styles
		wp_enqueue_style('business_style', get_template_directory_uri() . '/css/theme.min.css', false, null);
		
		// Register Scripts
		wp_deregister_script( 'jquery' );

		wp_register_script( 'jquery', get_template_directory_uri() . '/js/vendor/jquery-1.11.2.min.js', array(), false, true );
		wp_register_script( 'modernizr', get_template_directory_uri() . '/js/vendor/modernizr-2.8.3.min.js' );
		wp_register_script( 'main', get_template_directory_uri() . '/js/scripts.min.js', array( 'jquery' ), false, true );
		
		wp_enqueue_script( 'modernizr' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'main' );

		wp_localize_script('main', 'WPDATA', array('ajaxurl' => admin_url('admin-ajax.php')));
	}
}

add_action( 'wp_enqueue_scripts', 'business_theme_scripts' );

function business_theme_admin_scripts() {
	// Admin Scripts and Styles
    wp_register_style( 'add-admin-stylesheet', get_template_directory_uri().'/css/admin.theme.min.css');
    wp_enqueue_style( 'add-admin-stylesheet' );
}

add_action( 'admin_enqueue_scripts', 'business_theme_admin_scripts' );


function business_register_customposts() {
	// Theme Custom Post Types
    register_post_type('presentation',
        array(
            'labels' => array(
                'name' => _x('Presentations', 'post type general name', 'business'),
                'singular_name' => _x('Presentation', 'post type singular name', 'business'),
                'add_new' => _x('Add New', 'interview', 'business'),
                'add_new_item' => __('Add New Presentation', 'business'),
                'edit_item' => __('Edit Presentation', 'business'),
                'new_item' => __('New Presentation', 'business'),
                'view_item' => __('View Presentation', 'business'),
                'search_items' => __('Search Presentation', 'business'),
                'not_found' => __('No Presentation found', 'business'),
                'not_found_in_trash' => __('No Presentation found in Trash', 'business'),
                'parent' => __('Parent Presentation', 'business'),
            ),
            'public' => true,
            'menu_icon' => 'dashicons-images-alt2',
            'menu_position' => 5,
            'hierarchical' => true,
            'has_archive' => true,
            'supports' => array('title', 'page-attributes'),
            'taxonomies' => array('post_tag'),
            'rewrite' => array('slug' => _x('presentation', 'URL slug', 'business'), 'with_front' => false)
        )
    );
	register_post_type('default',
		array(
			'labels' => array(
				'name' => _x('Defaults', 'post type general name', 'business'),
				'singular_name' => _x('Default', 'post type singular name', 'business'),
				'add_new' => _x('Add New', 'Default', 'business'),
				'add_new_item' => __('Add New Default', 'business'),
				'edit_item' => __('Edit Default', 'business'),
				'new_item' => __('New Default', 'business'),
				'view_item' => __('View Default', 'business'),
				'search_items' => __('Search Default', 'business'),
				'not_found' => __('No Default found', 'business'),
				'not_found_in_trash' => __('No Default found in Trash', 'business'),
				'parent' => __('Parent Default', 'business'),
			),
			'public' => true,
			'menu_icon' => 'dashicons-nametag',
			'menu_position' => 5,
			'hierarchical' => true,
			'has_archive' => true,
			'supports' => array('title','page-attributes'),
			'taxonomies' => array('post_tag'),
			'rewrite' => array('slug' => _x('default', 'URL slug', 'business'), 'with_front' => false)
		)
	);
}

add_action('init', 'business_register_customposts');

function business_remove_admin_menus(){
	// Admin remove stuff we don't need
	global $menu;
	$restricted = array(__('Posts'),__('Comments'),__('Pages'));
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	}
}

add_action('admin_menu', 'business_remove_admin_menus');

function business_customm_acf_toolbars( $toolbars ){
	// Add Custom WYSIWYG field to ACF
	$toolbars['Very Simple' ] = array();
	$toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'underline' );

	if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false ){
	    unset( $toolbars['Full' ][2][$key] );
	}

	unset( $toolbars['Basic' ] );
	return $toolbars;
}

add_filter( 'acf/fields/wysiwyg/toolbars' , 'business_customm_acf_toolbars'  );

function business_custom_password_form() {
	// Create Custom Password form
    global $post;
    $label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
    $o = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
    <label for="' . $label . '">' . __( "Password:" ) . ' </label><input name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" /><input type="submit" name="Submit" value="' . esc_attr__( "Unlock" ) . '" />
    </form>
    ';
    return $o;
}

add_filter( 'the_password_form', 'business_custom_password_form' );

function business_custom_mime_types( $mimes ){
	// Allow Custom Mime types in the WP uploader
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

add_filter( 'upload_mimes', 'business_custom_mime_types' );

/* 
/ ----------------------------------------------
/ CUSTOM SLIDE FUNCTIONALITY
/ ----------------------------------------------
*/

$slide_id = 0;
$slide_prefix = 'slide-';
$anchor_prefix = 's-';
$slide_anchors = array();

function set_slide_id($uid){
	global $slide_id;
	$slide_id = $uid;
}
function get_slide_id(){
	global $slide_id;
	return $slide_id;
}
function the_slide_anchors(){
	global $slide_anchors;
	$json = json_encode($slide_anchors);
	echo '<script type="text/javascript"> var anchies='.$json.'; </script>';
}
function the_slide_id(){
	global $slide_prefix, $anchor_prefix, $slide_anchors;
	$current = (int) get_slide_id();
	$next = $current +1;
	set_slide_id($next);
	$anchor = $anchor_prefix.$next;
	$slide = $slide_prefix.$next;
	array_push($slide_anchors,$anchor);
	echo $slide;
}

/* 
/ ----------------------------------------------
/ ACF FIELD EXPORT
/ ----------------------------------------------
*/

if( function_exists('register_field_group') ):

register_field_group(array (
	'key' => 'group_54e495dd4eb5b',
	'title' => 'Slide Fields',
	'fields' => array (
		array (
			'key' => 'field_54e495e9043f7',
			'label' => 'Slides',
			'name' => 'slides',
			'prefix' => '',
			'type' => 'flexible_content',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'button_label' => 'Add Slide',
			'min' => '',
			'max' => '',
			'layouts' => array (
				array (
					'key' => '54e495f59a1b5',
					'name' => 'chapter',
					'label' => 'Chapter',
					'display' => 'row',
					'sub_fields' => array (
						array (
							'key' => 'field_54e49628043f8',
							'label' => 'Title',
							'name' => 'chapter_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e496c9043fa',
							'label' => 'Name',
							'name' => 'chapter_name',
							'prefix' => '',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'very_simple',
							'media_upload' => 0,
						),
						array (
							'key' => 'field_54e4971a043fc',
							'label' => 'Note',
							'name' => 'chapter_note',
							'prefix' => '',
							'type' => 'textarea',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter a footnote',
							'maxlength' => '',
							'rows' => 3,
							'new_lines' => 'wpautop',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e496f7043fb',
							'label' => 'Background',
							'name' => 'chapter_background',
							'prefix' => '',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => 0,
							'min_height' => 0,
							'min_size' => 0,
							'max_width' => 0,
							'max_height' => 0,
							'max_size' => 0,
							'mime_types' => '',
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54e5ed31d766f',
					'name' => 'text',
					'label' => 'Text',
					'display' => 'row',
					'sub_fields' => array (
						array (
							'key' => 'field_54e5ed58d7670',
							'label' => 'Title',
							'name' => 'text_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e5ed6ed7671',
							'label' => 'Statement',
							'name' => 'text_statement',
							'prefix' => '',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'very_simple',
							'media_upload' => 0,
						),
						array (
							'key' => 'field_54e5ed9ed7672',
							'label' => 'Background',
							'name' => 'text_background',
							'prefix' => '',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => 0,
							'min_height' => 0,
							'min_size' => 0,
							'max_width' => 0,
							'max_height' => 0,
							'max_size' => 0,
							'mime_types' => '',
						),
						array (
							'key' => 'field_54e5edc8d7673',
							'label' => 'Note',
							'name' => 'text_note',
							'prefix' => '',
							'type' => 'textarea',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter a footnote',
							'maxlength' => '',
							'rows' => 3,
							'new_lines' => 'wpautop',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e5ee04d7674',
							'label' => 'Button',
							'name' => 'text_button',
							'prefix' => '',
							'type' => 'repeater',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => '',
							'max' => 1,
							'layout' => 'row',
							'button_label' => 'Add Button',
							'sub_fields' => array (
								array (
									'key' => 'field_54e5ee1ed7675',
									'label' => 'label',
									'name' => 'button_label',
									'prefix' => '',
									'type' => 'text',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Click me',
									'prepend' => '',
									'append' => '',
									'maxlength' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54e5ee41d7676',
									'label' => 'URL',
									'name' => 'button_url',
									'prefix' => '',
									'type' => 'url',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'http://',
								),
							),
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54e5efb87d2f6',
					'name' => 'image_grid',
					'label' => 'Image grid',
					'display' => 'row',
					'sub_fields' => array (
						array (
							'key' => 'field_54f6bece52e49',
							'label' => 'Title',
							'name' => 'images_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e5efcf7d2f7',
							'label' => 'Images',
							'name' => 'images',
							'prefix' => '',
							'type' => 'gallery',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => '',
							'max' => 12,
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '',
							'mime_types' => '',
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54e5f10b7b000',
					'name' => 'image_presenter',
					'label' => 'Image presenter',
					'display' => 'row',
					'sub_fields' => array (
						array (
							'key' => 'field_54e5f1287b001',
							'label' => 'Item',
							'name' => 'presenter_item',
							'prefix' => '',
							'type' => 'repeater',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => '',
							'max' => '',
							'layout' => 'row',
							'button_label' => 'Add Image Slide',
							'sub_fields' => array (
								array (
									'key' => 'field_54e5f1407b002',
									'label' => 'Title',
									'name' => 'item_title',
									'prefix' => '',
									'type' => 'text',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Enter your title here',
									'prepend' => '',
									'append' => '',
									'maxlength' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54e5f17b7b004',
									'label' => 'Image',
									'name' => 'Item_image',
									'prefix' => '',
									'type' => 'image',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'return_format' => 'array',
									'preview_size' => 'thumbnail',
									'library' => 'all',
									'min_width' => 0,
									'min_height' => 0,
									'min_size' => 0,
									'max_width' => 0,
									'max_height' => 0,
									'max_size' => 0,
									'mime_types' => '',
								),
								array (
									'key' => 'field_54e5f3d57b005',
									'label' => 'Fit or Fill',
									'name' => 'item_fitfill',
									'prefix' => '',
									'type' => 'radio',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'choices' => array (
										'fit' => 'Fit',
										'fill' => 'Fill',
									),
									'other_choice' => 0,
									'save_other_choice' => 0,
									'default_value' => 'fit : Fit',
									'layout' => 'horizontal',
								),
								array (
									'key' => 'field_54e5f15a7b003',
									'label' => 'Note',
									'name' => 'item_note',
									'prefix' => '',
									'type' => 'textarea',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Enter a footnote',
									'maxlength' => '',
									'rows' => 3,
									'new_lines' => 'wpautop',
									'readonly' => 0,
									'disabled' => 0,
								),
							),
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54f85dec9d65f',
					'name' => 'overview',
					'label' => 'Overview',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_54f85df49d660',
							'label' => 'Title',
							'name' => 'overview_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54f85e029d661',
							'label' => 'Name',
							'name' => 'overview_name',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your slide name here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54f85e219d662',
							'label' => 'Items',
							'name' => 'overview_items',
							'prefix' => '',
							'type' => 'repeater',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => 1,
							'max' => 5,
							'layout' => 'row',
							'button_label' => 'Add Item',
							'sub_fields' => array (
								array (
									'key' => 'field_54f85e379d663',
									'label' => 'Icon',
									'name' => 'item_icon',
									'prefix' => '',
									'type' => 'image',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'return_format' => 'array',
									'preview_size' => 'thumbnail',
									'library' => 'all',
									'min_width' => '',
									'min_height' => '',
									'min_size' => '',
									'max_width' => '',
									'max_height' => '',
									'max_size' => '',
									'mime_types' => '',
								),
								array (
									'key' => 'field_54f85e5a9d664',
									'label' => 'Caption',
									'name' => 'item_caption',
									'prefix' => '',
									'type' => 'text',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Enter caption',
									'prepend' => '',
									'append' => '',
									'maxlength' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54f85e709d665',
									'label' => 'Description',
									'name' => 'item_description',
									'prefix' => '',
									'type' => 'wysiwyg',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'tabs' => 'all',
									'toolbar' => 'very_simple',
									'media_upload' => 0,
								),
							),
						),
						array (
							'key' => 'field_54f8704482828',
							'label' => 'Items connected',
							'name' => 'overview_items_connected',
							'prefix' => '',
							'type' => 'true_false',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'message' => '',
							'default_value' => 1,
						),
						array (
							'key' => 'field_54f8701782827',
							'label' => 'Note',
							'name' => 'overview_note',
							'prefix' => '',
							'type' => 'textarea',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter a footnote',
							'maxlength' => '',
							'rows' => 3,
							'new_lines' => 'wpautop',
							'readonly' => 0,
							'disabled' => 0,
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54f85f03b1c45',
					'name' => 'estimate',
					'label' => 'Estimate',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_54f85f18b1c46',
							'label' => 'Title',
							'name' => 'estimate_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54f85f25b1c47',
							'label' => 'Items',
							'name' => 'estimate_items',
							'prefix' => '',
							'type' => 'repeater',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => 1,
							'max' => 3,
							'layout' => 'row',
							'button_label' => 'Add Item',
							'sub_fields' => array (
								array (
									'key' => 'field_54f85f41b1c48',
									'label' => 'Title',
									'name' => 'item_title',
									'prefix' => '',
									'type' => 'text',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Enter your title here',
									'prepend' => '',
									'append' => '',
									'maxlength' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54f85f74b1c49',
									'label' => 'Subtitle',
									'name' => 'item_subtitle',
									'prefix' => '',
									'type' => 'text',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => 'Enter your subtitle here',
									'prepend' => '',
									'append' => '',
									'maxlength' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54f85f83b1c4a',
									'label' => 'Description',
									'name' => 'item_description',
									'prefix' => '',
									'type' => 'wysiwyg',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'tabs' => 'all',
									'toolbar' => 'very_simple',
									'media_upload' => 1,
								),
								array (
									'key' => 'field_54f85fa2b1c4b',
									'label' => 'Price',
									'name' => 'item_price',
									'prefix' => '',
									'type' => 'number',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => '',
									'prepend' => '',
									'append' => '',
									'min' => '',
									'max' => '',
									'step' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
								array (
									'key' => 'field_54f85fc7b1c4c',
									'label' => 'Discount',
									'name' => 'item_discount',
									'prefix' => '',
									'type' => 'number',
									'instructions' => '',
									'required' => 0,
									'conditional_logic' => 0,
									'wrapper' => array (
										'width' => '',
										'class' => '',
										'id' => '',
									),
									'default_value' => '',
									'placeholder' => '',
									'prepend' => '',
									'append' => '',
									'min' => '',
									'max' => '',
									'step' => '',
									'readonly' => 0,
									'disabled' => 0,
								),
							),
						),
						array (
							'key' => 'field_54f8a9798c53f',
							'label' => 'Note',
							'name' => 'estimate_note',
							'prefix' => '',
							'type' => 'textarea',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter a footnote',
							'maxlength' => '',
							'rows' => 3,
							'new_lines' => 'wpautop',
							'readonly' => 0,
							'disabled' => 0,
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54e5f5a3c79d6',
					'name' => 'video',
					'label' => 'Video',
					'display' => 'row',
					'sub_fields' => array (
						array (
							'key' => 'field_54e5f5a3c79d7',
							'label' => 'Title',
							'name' => 'video_title',
							'prefix' => '',
							'type' => 'text',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter your title here',
							'prepend' => '',
							'append' => '',
							'maxlength' => '',
							'readonly' => 0,
							'disabled' => 0,
						),
						array (
							'key' => 'field_54e5f63fc79db',
							'label' => 'Video URL',
							'name' => 'video_url',
							'prefix' => '',
							'type' => 'url',
							'instructions' => 'Use *.mp4 only',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'http://',
						),
						array (
							'key' => 'field_54e5f5a3c79da',
							'label' => 'Fallback',
							'name' => 'video_fallback',
							'prefix' => '',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'thumbnail',
							'library' => 'all',
							'min_width' => 0,
							'min_height' => 0,
							'min_size' => 0,
							'max_width' => 0,
							'max_height' => 0,
							'max_size' => 0,
							'mime_types' => '',
						),
						array (
							'key' => 'field_54e5f5a3c79d8',
							'label' => 'Name',
							'name' => 'video_name',
							'prefix' => '',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'very_simple',
							'media_upload' => 0,
						),
						array (
							'key' => 'field_54e5f5a3c79d9',
							'label' => 'Note',
							'name' => 'video_note',
							'prefix' => '',
							'type' => 'textarea',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'placeholder' => 'Enter a footnote',
							'maxlength' => '',
							'rows' => 3,
							'new_lines' => 'wpautop',
							'readonly' => 0,
							'disabled' => 0,
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '54e5f80a37b24',
					'name' => 'default',
					'label' => 'Default',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_54e5f81137b25',
							'label' => 'Relation',
							'name' => 'default_relation',
							'prefix' => '',
							'type' => 'relationship',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'post_type' => array (
								0 => 'default',
							),
							'taxonomy' => '',
							'filters' => array (
								0 => 'search',
							),
							'elements' => '',
							'max' => '',
							'return_format' => 'id',
						),
					),
					'min' => '',
					'max' => '',
				),
			),
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'presentation',
			),
		),
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'default',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
));
endif;