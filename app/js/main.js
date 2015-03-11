$(document).ready(function() {

	var gridContainerWidth;
	var gridContainerHeight;

	function setGridContainerWidth(w){
		gridContainerWidth = w;
	}
	function getGridContainerWidth(){
		return gridContainerWidth;
	}
	function setGridContainerHeight(h){
		gridContainerHeight = h;
	}
	function getGridContainerHeight(){
		return gridContainerHeight;
	}

 	// User Agent Variables
	var isPhone = false;
	var isIpad = false;
	
	// Detect User Agent
	if(navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i)) {
		$('body').addClass('phone');
		isPhone = true;
	}
	if(navigator.userAgent.match(/iPad/i)){
		$('body').addClass('ipad');
		isIpad = true;
	}

	//Fullpage JS
	if(!isPhone){ // Only do fullpage if it's not a phone device
	    $('#fullpage').fullpage({
	        menu: false,
	        anchors:['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'],
	        navigation: true,
	        navigationPosition: 'right',
	        navigationTooltips: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'],
	        slidesNavigation: true,
	        slidesNavPosition: 'bottom',
	        verticalCentered: false,

	        onLeave: function(index, nextIndex, direction){
	        	var current = $(this);
	        	if(current.hasClass('video')){
	        		$(current).find('video').get(0).pause();
	        	}
	        },
	        afterLoad: function(anchorLink, index){
	        	var current = $(this);
	        	if(current.hasClass('video')){
	        		$(current).find('video').get(0).play();
	        	}
	        },
	        afterRender: function(){},
	        afterResize: function(){},
	        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
	        },
	        onSlideLeave: function(anchorLink, index, slideIndex, direction){
	        }
	    });
    }

// ################  Fit slide ####################################

	function setImageRatio(){
		$('.imgcontainer-flex').each(function(){
			var imgH = $(this).children('img').height();
			var imgW = $(this).children('img').width();
			var imgRatio = imgW / imgH;
			$(this).attr('data-ratio', imgRatio);	
		});	
	}

	function fitImageToContainer(){
		// Get window height and width and set container height and width
		var winH = $(window).height();
		var winW = $(window).width();

		if(isPhone){
			$('.imgcontainer-flex').css('height', 'auto');
		}else{
			$('.imgcontainer-flex').css('height', winH * 0.8);
		}
		
		$('.imgcontainer-flex').css('width', winW * 0.9);

		$('.imgcontainer-flex').each(function(){
			$(this).removeClass('portrait verticalalign landscape');

			var el = $(this);	
			var refH = el.height();
			var refW = el.width();
			var refRatio = refW/refH;

			if ( $(this).attr('data-ratio') < refRatio ) { 
			    $(this).addClass('portrait');
			} else {
			    $(this).addClass('verticalalign landscape');
			}
		});
	}

// ################ End fit slide ##################################


// ################ Image grid #####################################

	function setGridImageRatio(){
		$('.gridcell').each(function(){
			var imgH = $(this).children('img').height();
			var imgW = $(this).children('img').width();
			var imgRatio = imgW / imgH;
			$(this).attr('data-ratio', imgRatio);	
		});	
	}

	function setGridContainerDims(){
		var width = $(window).width();
		var height = $(window).height();

		var wPerc; 							// Percentage of width
		var hPerc; 							// Percentage of height
		var belowTablet;

		if (width > 1024) {
			wPerc = 0.951;
			hPerc = 0.8;
		} else if (768 <= width <= 1024) {
			wPerc = 0.902;
			hPerc = 0.65;
		}
		if (width < 767) {
			wPerc = 1;
			belowTablet = true;
		}

		setGridContainerWidth(Math.floor(width * wPerc));
		
		if (belowTablet) {
			setGridContainerHeight('auto');		// Make a 1 column lay out
		}else{
			setGridContainerHeight(Math.floor(height * hPerc));
		}

		$('.gridcontainer').css('width', getGridContainerWidth());
		$('.gridcontainer').css('height', getGridContainerHeight());
	}

	function fitGridImageToContainer(){
		var bottomMargin = 10;
		var sideMargin = 5;

		// Get grid container dimensions
		var contH = getGridContainerHeight();
		var contW = getGridContainerWidth();

		var widthCellPerc;
		var heightCellPerc;
		var horGutterCount;
		var vertGutterCount;

		var belowTablet;
		var cellHeight;
		var cellWidth;


		// Determine 4 or 3 column lay-out
		var width = $(window).width();

		if (width > 1024){
			widthCellPerc = 0.25;
			heightCellPerc = 0.3333333;
			horGutterCount = 8;
			vertGutterCount = 3;
		} else if (768 <= width <= 1024){
			widthCellPerc = 0.33333333;
			heightCellPerc = 0.25;
			horGutterCount = 6;
			vertGutterCount = 4;
		}
		if(width < 768){
			belowTablet = true;
			sideMargin = 0;
		}

		// Calculate gridcell div dimensions
		if(belowTablet){
			cellHeight = 'auto';	// Make a 1 column lay out
			cellWidth = '100%';
		}else{
			cellHeight = Math.floor( (contH - (vertGutterCount * bottomMargin) ) * heightCellPerc ); // compensate for margin
			cellWidth = Math.floor( (contW - (horGutterCount * sideMargin) ) * widthCellPerc ); // same here
		}

		$('.gridcell').css('height', cellHeight);
		$('.gridcell').css('width', cellWidth);
		$('.gridcell').css('margin-bottom', bottomMargin).css('margin-left', sideMargin).css('margin-right',sideMargin);


		// Fit the images in the gridcells
		if(!belowTablet){
			$('.gridcell').each(function(){
				$(this).removeClass('portrait verticalalign landscape fullwidth');

				var el = $(this);
				var refH = el.height();
				var refW = el.width();
				var refRatio = refW/refH;

				if ( $(this).attr('data-ratio') < refRatio ) { 
				    $(this).addClass('portrait');
				} else {
				    $(this).addClass('verticalalign landscape');
				}
			});
		} else{
			$('.gridcell').each(function(){
				$(this).removeClass('portrait verticalalign landscape');
				$(this).addClass('fullwidth');
			});
		}
	}
// ################ End of image grid ###############################


	$('body').imagesLoaded( function() {
		setImageRatio();
		fitImageToContainer();

		setGridImageRatio();
		setGridContainerDims();
		fitGridImageToContainer();
	});
	
	$(window).smartresize(function(){
		fitImageToContainer();

		setGridContainerDims();
		fitGridImageToContainer();
	});
});