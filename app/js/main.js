$(document).ready(function() {

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
        anchors:['first', 'second', 'third', 'fourth'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['first', 'second', 'third', 'fourth'],
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

		console.log(winH, winW);

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

	$('body').imagesLoaded( function() {
		setImageRatio();
		fitImageToContainer();
	});
	
	$(window).smartresize(function(){
		fitImageToContainer();
	});
});