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

	if ( !is_admin() ) {
		wp_enqueue_style('business_style', get_template_directory_uri() . '/css/theme.min.css', false, null);

		wp_deregister_script( 'jquery' );
		//wp_register_script( 'jquery', "http" . ( $_SERVER['SERVER_PORT'] == 443 ? "s" : "" ) . "://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js", array(), false, true );

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
    wp_register_style( 'add-admin-stylesheet', get_template_directory_uri().'/css/admin.theme.min.css');
    wp_enqueue_style( 'add-admin-stylesheet' );
}

add_action( 'admin_enqueue_scripts', 'business_theme_admin_scripts' );


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

function my_password_form() {
    global $post;
    $label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
    $o = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
    <label for="' . $label . '">' . __( "Password:" ) . ' </label><input name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" /><input type="submit" name="Submit" value="' . esc_attr__( "Unlock" ) . '" />
    </form>
    ';
    return $o;
}
add_filter( 'the_password_form', 'my_password_form' );



##################################################################

# enable images in media uploader

##################################################################
function cc_mime_types( $mimes ){
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

// CREATE UNIQUE IDS for slides
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
// Custom Post status
function custom_post_status(){
	register_post_status( 'unread', array(
		'label'                     => _x( 'Unread', 'post' ),
		'public'                    => true,
		'exclude_from_search'       => false,
		'show_in_admin_all_list'    => true,
		'show_in_admin_status_list' => true,
		'label_count'               => _n_noop( 'Unread <span class="count">(%s)</span>', 'Unread <span class="count">(%s)</span>' ),
	) );
}
add_action( 'init', 'custom_post_status' );




// CUSTOM FIELDS



