<?php
/**
 * @package WordPress
 * @subpackage New_Business
 * @since New Business 0.0.1
 */

get_header(); ?>

<?php
$fields = get_fields();
echo '<pre>';
var_dump( $fields ); 
echo '</pre>';
?>

<?php get_footer(); ?>