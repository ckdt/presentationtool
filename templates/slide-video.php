<?php
	$title = get_sub_field( 'video_title' );
	$name = get_sub_field( 'video_name' );
	$note = get_sub_field( 'video_note' );
	$video = get_sub_field( 'video_url' );
	$fallback  = get_sub_field( 'video_fallback' );
?>
<section class="section video" id="two" style="background-image: url(<?php echo $fallback["sizes"]["large"]; ?>)">
	<video loop muted controls="false" id="thevideo">
		<source src="video/284081672.mp4" type="video/mp4">
		<source src="video/284081672.webm" type="video/webm">
	</video>
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