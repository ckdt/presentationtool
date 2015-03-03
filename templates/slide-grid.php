<?php
	$images = get_sub_field( 'images' );

?>
<section class="section grid" id="five">
	<div class="section-content">
		<header class="section-title">
			<h2>chapter</h2>
		</header>

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