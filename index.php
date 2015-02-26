<?php
/**
 * @package WordPress
 * @subpackage New_Business
 * @since New Business 0.0.1
 */
get_header(); ?>
<div id="fullpage">

<?php if ( $slides = get_field( 'slides' ) ): ?>
	<?php while ( has_sub_field( 'slides' ) ): ?>
		<?php if ( get_row_layout() == 'chapter' ): // layout: Chapter ?>
			<?php get_template_part( 'templates/slide', 'chapter' ); ?>
		<?php endif; ?>
	<?php endwhile; ?>
<?php else : // No blocks added yet ?>
<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<p>Add some content blocks please...</p>
		</div>
	</div>
</div>

<?php endif; ?>


<?php
$fields = get_fields();
echo '<pre>';
var_dump( $fields ); 
echo '</pre>';
?>

</div>
<?php get_footer(); ?>