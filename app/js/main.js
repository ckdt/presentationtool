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
        afterRender: function(index, nextIndex, direction){
            $('video').get(0).pause();
            console.log(index, nextIndex, direction);
        },
    });
});

// .load() is an unreliable function, but it works for now...
$(window).load(function(){
	$(".imgcontainer").each(function(){

	var el = $(this);	
	var refH = el.height();
	var refW = el.width();
	var refRatio = refW/refH;

	console.log(refH, refW, refRatio);

	var imgH = el.children("img").height();
	var imgW = el.children("img").width();

	var picRatio = imgW/imgH;

	var src = el.children("img").attr('src');

	console.log(src, imgH, imgW);

	    if ( picRatio < refRatio ) { 
	        $(this).addClass("portrait");
	    } else {
	        $(this).addClass("verticalalign landscape");
	    }
	});
});