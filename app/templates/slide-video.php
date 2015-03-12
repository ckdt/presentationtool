<?php
	$title = get_sub_field( 'video_title' );
	$name = get_sub_field( 'video_name' );
	$note = get_sub_field( 'video_note' );
	$video = get_sub_field( 'video_url' );
	$fallback  = get_sub_field( 'video_fallback' );
	if($fallback){
		$style = 'style="background-image: url('. $fallback["sizes"]["large"].');"';
	}else{
		$style = '';
	}
?>
<section class="section video" id="<?php the_slide_id(); ?>" <?php echo $style; ?>>
	
	<video loop muted controls="false">
		<source src="<?php echo $video; ?>" type="video/mp4">
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