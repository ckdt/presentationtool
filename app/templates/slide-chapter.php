<?php
	$title = get_sub_field( 'chapter_title' );
	$name = get_sub_field( 'chapter_name' );
	$note = get_sub_field( 'chapter_note' );
	$background  = get_sub_field( 'chapter_background' );
	if($background){
		$style = 'style="background-image: url('. $background["sizes"]["large"].');"';
	}else{
		$style = '';
	}
?>	
<section class="section chapter" id="<?php the_slide_id(); ?>" <?php echo $style; ?> >
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