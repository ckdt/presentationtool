<?php
	$items = get_sub_field( 'overview_items' );

	// print('<pre>');
	// print_r($items);
	// print('</pre>');
?>

<section class="section overview" id="overview-<?php echo $GLOBALS['x']; ?>">
	<div class="section-content">

<?php if($items): ?>
<?php foreach($items as $item): ?>
	<img src="<?php echo $item["item_icon"]["url"]; ?>"/>
<?php endforeach; ?>
<?php else: ?>
	<div> No items found</div>
<?php endif; ?>
	</div>
</section>