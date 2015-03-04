<?php
	$title = get_sub_field( 'text_title' );
	$statement = get_sub_field( 'text_statement' );
	$note = get_sub_field( 'text_note' );
	$button = get_sub_field( 'text_button' );
	$background  = get_sub_field( 'text_background' );
?>
<section class="section text" id="text-<?php echo $GLOBALS['x']; ?>" style="background-image: url(<?php echo $background["sizes"]["large"]; ?>)">
	<div class="section-content">
		<?php if(isset($title) && $title != "" ): ?>
		
		<header class="section-title">
			<h2><?php echo $title; ?></h2>
		</header>
		
		<?php endif; ?>

		<?php if(isset($statement) && $statement != "" ): ?>
		<div class="section-body">
			<div class="wrap">
			<?php echo $statement; ?>

			<?php if(isset($button)): ?>
			<p><a href="<?php echo $button[0]["button_url"];?>" class="button"><?php echo $button[0]["button_label"];?></a></p>
			<?php endif; ?>
			</div>
		</div>
		<?php endif; ?>

		<?php if(isset($note) && $note != "" ): ?>

		<footer class="section-footer">
			<p><?php echo $note; ?></p>
		</footer>

		<?php endif; ?>
	</div>
</section>