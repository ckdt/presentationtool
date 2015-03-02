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
    $('#fullpage').fullpage({
        menu: false,
        anchors:['first', 'second', 'third', 'fourth', 'fifth'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['first', 'second', 'third', 'fourth', 'fifth'],
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
		$('.imgcontainer-flex').css('height', winH * 0.8);
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

		if (width > 1024) {
			wPerc = 0.951;
			hPerc = 0.8;
			console.log(' > 1024');
		} else if (768 <= width <= 1024) {
			wPerc = 0.902;
			hPerc = 0.65;
			console.log('between');
		} else if (width < 768) {
			wPerc = 0.938;
			hPerc = 1;
			console.log('else');
		}

		setGridContainerWidth(Math.floor(width * wPerc));
		setGridContainerHeight(Math.floor(height * hPerc));

		$('.gridcontainer').css('width', getGridContainerWidth());
		$('.gridcontainer').css('height', getGridContainerHeight());
	}

	function fitGridImageToContainer(){
		var topMargin = 10;
		var sideMargin = 5;

		// Get grid container dims
		var contH = getGridContainerHeight();
		var contW = getGridContainerWidth();

		var widthCellPerc;
		var heightCellPerc;
		var horGutterCount;
		var vertGutterCount;

		// Determine 4 or 3 column lay-out
		var width = $(window).width();

		if (width > 1024){
			widthCellPerc = 0.25;
			heightCellPerc = 0.3333333;
			horGutterCount = 8;
			vertGutterCount = 3;
		} else if (width <= 1024){
			widthCellPerc = 0.33333333;
			heightCellPerc = 0.25;
			horGutterCount = 6;
			vertGutterCount = 4;
		}

		// Calculate gridcell div dimensions
		var cellHeight = Math.floor( (contH - (vertGutterCount * topMargin) ) * heightCellPerc ); // compensate for margin
	 	var cellWidth = Math.floor( (contW - (horGutterCount * sideMargin) ) * widthCellPerc ); // same here

		$('.gridcell').css('height', cellHeight);
		$('.gridcell').css('width', cellWidth);
		$('.gridcell').css('margin-top', topMargin).css('margin-left', sideMargin).css('margin-right',sideMargin);


		// Fit the images in the gridcells
		$('.gridcell').each(function(){
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