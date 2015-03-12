<?php
	$title = get_sub_field( 'estimate_title' );
	$items = get_sub_field( 'estimate_items' );
	$note = get_sub_field( 'estimate_note' );
?>
<section class="section estimate" id="<?php the_slide_id(); ?>">
	<div class="section-content">
		<?php if(isset($title) && $title != "" ): ?>
		<header class="section-title">
			<h2><?php echo $title; ?></h2>
		</header>
		<?php endif; ?>

		<?php if($items): 
			$n = 0;
		?>
		<div class="section-body">
			<div class="wrap">
				<div class="estimaterow">

					<?php
					foreach($items as $item): 
						$n++;
					?>
					<div class="estimatecontainer">
						<div class="inner">
							<div class="estimateheader">
								<div class="numbercircle">
									<h2><?php echo $n; ?></h2>
								</div>
								<h4><?php echo $item["item_title"]; ?></h4>
								<H5><?php echo $item["item_subtitle"]; ?></h5>
							</div>
							<div class="estimatetext">
								<?php echo $item["item_description"]; ?>
							</div>
						</div>
						<div class="price">
							<?php if($item["item_discount"]): ?>
							<div class="discountperc">
								<h4><?php echo '- '.$item["item_discount"].'%'; ?></h4>
							</div>
							<?php endif; ?>
							<div class="innerprice">
								<?php
									$price = $item["item_price"];
									$discount = $item["item_discount"];
									if($discount){
										$new_price = $price - ($price * ($discount / 100));
									}else{
										$new_price = $price;
									}
									$price = number_format((float)$price, 2, ',', '');
									$new_price = number_format((float)$new_price, 2, ',', '');
								?>
								<?php if($discount):?>
								<p class="pricebefore"><?php echo '&euro;'.$price; ?></p>
								<?php endif; ?>

								<?php if($price):?>
								<h3><?php echo '&euro;'.$new_price; ?></h3>
								<p>EX BTW</p>
								<?php endif; ?>
							</div>
						</div>
					</div>
					<?php 
						endforeach; 
					?>
				</div>
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