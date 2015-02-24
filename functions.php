<?php
function business_theme_setup() {
	load_theme_textdomain( 'business', get_template_directory() . '/lang' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );
	add_post_type_support( 'page', 'excerpt' );

	// Clean header
	remove_action ('wp_head', 'wp_generator');
	remove_action ('wp_head', 'rsd_link');
	remove_action ('wp_head', 'wlwmanifest_link');
	remove_action ('wp_head', 'wp_shortlink_wp_head');

}
add_action( 'after_setup_theme', 'business_theme_setup' );

function business_theme_scripts(){
	wp_enqueue_style( 'business-style', get_template_directory_uri() . '/css/jquery.fullPage.css', array(), '2.5.7' );
	wp_enqueue_script( 'fullpage-script', get_template_directory_uri() . '/js/jquery.fullPage.min.js', array( 'jquery' ), '2.5.7');
}
add_action( 'wp_enqueue_scripts', 'business_theme_scripts' );


function business_register_customposts() {
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
	global $menu;
	$restricted = array(__('Posts'),__('Comments'),__('Pages'));
	end ($menu);
	while (prev($menu)){
		$value = explode(' ',$menu[key($menu)][0]);
		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
	}
}
add_action('admin_menu', 'business_remove_admin_menus');

function business_customm_afc_toolbars( $toolbars ){
	$toolbars['Very Simple' ] = array();
	$toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'underline' );

	if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false ){
	    unset( $toolbars['Full' ][2][$key] );
	}

	// remove the 'Basic' toolbar completely
	unset( $toolbars['Basic' ] );

	// return $toolbars - IMPORTANT!
	return $toolbars;
}
add_filter( 'acf/fields/wysiwyg/toolbars' , 'business_customm_afc_toolbars'  );