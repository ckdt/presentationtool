<?php
	$title = get_sub_field( 'overview_title' );
	$name = get_sub_field( 'overview_name' );
	$note = get_sub_field( 'overview_note' );
	$connected = get_sub_field( 'overview_items_connected' );
	$items = get_sub_field( 'overview_items' );
?>
<section class="section overview" id="<?php the_slide_id(); ?>">
	<div class="section-content">
		<?php if(isset($title) && $title != "" ): ?>
		<header class="section-title">
			<h2><?php echo $title; ?></h2>
		</header>
		<?php endif; ?>
		<div class="section-body">
			<div class="wrap">
				<?php if(isset($name) && $name != "" ): ?>
					<h1><?php echo $name; ?></h1>
				<?php endif; ?>

				<?php 

				if($items): 
				$len = count($items);
				$num = 0;
				?>
				<div class="itemrow">

				<?php foreach($items as $item): ?>

					<div class="itemcontainer">
						<div class="circle">
							<img src="<?php echo $item["item_icon"]["url"]; ?>" width="64" height="64"/>
						</div>
						<div class="itemtext">
							<h3><?php echo $item["item_caption"]; ?></h3>
							<?php echo $item["item_description"]; ?>
						</div>
					</div>

					<?php if($num < $len-1): ?>
						<div class="arrow">
							<?php if($connected) : ?>
							<img src="<?php echo get_template_directory_uri(); ?>/img/chevron_right.svg" width="16" height="26" />
							<?php endif; ?>
						</div>
					<?php endif; ?>

				<?php 
					$num++;
					endforeach; 
				?>

				</div>
				<?php endif; ?>
			</div>
		</div>
		<?php if(isset($note) && $note != "" ): ?>
		<footer class="section-footer">
			<p><?php echo $note; ?></p>
		</footer>
		<?php endif; ?>
	</div>
</section>