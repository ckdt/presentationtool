<?php
	$title = get_sub_field( 'chapter_title' );
	$name = get_sub_field( 'chapter_name' );
	$note = get_sub_field( 'chapter_note' );
	$background  = get_sub_field( 'chapter_background' );
?>
<section class="section chapter" id="chapter-<?php echo $GLOBALS['x']; ?>" style="background-image: url(<?php echo $background["sizes"]["large"]; ?>)">
	<div class="section-content">

		<?php if(isset($title) && $title != "" ): ?>
		<header class="section-title">
			<h2><?php echo $title; ?></h2>
		</header>
		<?php endif; ?>
		
		<?php if(isset($name) && $name != "" ): ?>
		<div class="section-body">
			<div class="wrap">
				<h1><?php echo $name; ?></h1>
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