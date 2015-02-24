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