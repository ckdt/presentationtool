<?php
	$title = get_sub_field( 'images_title' );
	$images = get_sub_field( 'images' );
?>
<section class="section grid" id="grid-<?php echo $GLOBALS['x']; ?>">
	<div class="section-content">
		<?php if(isset($title) && $title != "" ): ?>
		
		<header class="section-title">
			<h2><?php echo $title; ?></h2>
		</header>
		
		<?php endif; ?>

<?php if($images): ?>
		<div class="gridcontainer">	
<?php foreach($images as $img): ?>
	<div class="gridcell">
		<img src="<?php echo $img["sizes"]["large"]; ?>"/>
	</div>
<?php endforeach; ?>
	  	</div>
<?php else: ?>
		<div> No images in this grid foudnnsnd</div>
<?php endif; ?>

	</div>
</section>