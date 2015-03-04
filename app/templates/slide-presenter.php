<section class="section image" id="image-<?php echo $GLOBALS['x']; ?>">

<?php if ( $items = get_sub_field( 'presenter_item' ) ): ?>
	<?php while ( has_sub_field( 'presenter_item' ) ): ?>

		<?php 
			$type = get_sub_field( 'item_fitfill' );
			$title = get_sub_field( 'item_title' );
			$image = get_sub_field( 'Item_image' ); // this need to be converted to lowercas in wordpress
			$note = get_sub_field( 'item_note' );
		?>

		<?php if($type === "fit"): ?>
			<div class="slide fit">
				<div class="section-content">

					<?php if(isset($title) && $title != "" ): ?>
					<header class="section-title">
						<h2><?php echo $title; ?></h2>
					</header>
					<?php endif; ?>

					<div class="section-body">
						<div class="wrap">
							<div class="imgcontainer-flex">
								<img src="<?php echo $image['sizes']['large']; ?>">
							</div>
						</div>
					</div>

					<?php if(isset($note) && $note != "" ): ?>
					<footer class="section-footer">
						<p><?php echo $note; ?></p>
					</footer>
					<?php endif; ?>

				</div>
			</div>
		<?php endif;?>
		<?php if($type === "fill"): ?>
			<div class="slide fill">
				<div class="section-bg">
					<img src="<?php echo $image['sizes']['large']; ?>">
				</div>

				<div class="section-content">
					<?php if(isset($title) && $title != "" ): ?>
					<header class="section-title">
						<h2><?php echo $title; ?></h2>
					</header>
					<?php endif; ?>

					<?php if(isset($note) && $note != "" ): ?>
					<footer class="section-footer">
						<p><?php echo $note; ?></p>
					</footer>
					<?php endif; ?>
				</div>
			</div>
		<?php endif;?>


	<?php endwhile; ?>
<?php endif; ?>

</section>