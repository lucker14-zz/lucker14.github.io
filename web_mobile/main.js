$(document).ready(function() {

	$('.button-first').click(function() {
		var parent = $(this).parent();
		var parentOffset = parent.offset();
		var parentHeight = parent.height();

		var destination = parentOffset.top + parentHeight;

		$('html, body').animate({
	    scrollTop: (destination -40) + 'px'
	 	}, 400, 'swing');

	});

	$('.click').on('click', function(e) {
		e.preventDefault();
		var thisItem = $(this);
		var data = thisItem.data();
		var id = '.' + data.jump;
		var offset = $(id).offset().top;
		$('html').velocity('scroll',{duration: 1000, offset: (offset - 40) + 'px'});
	
		if ($('.mobile-nav').css('display') == 'block') {
			$('.mobile-nav').slideToggle('fast');
			console.log('click');
		};
	});

	$('.hamburger-menu').on('click', function() {
		$('.mobile-nav').slideToggle('fast');
			console.log('click2');	
	});

	// $('.mobile-nav-click').on('click', function() {
	// 	$('.mobile-nav').slideToggle('fast');
	// });

	// $(document).on('touchend', function() {
	// 	if ($('.mobile-nav').css('display') == 'block') {
	// 		$('.mobile-nav').slideToggle('fast');
	// 		console.log('click3');
	// 	};
	// });

	i18n.init({ lng: 'cs' }, function(err, t) { 
		$('html').i18n();
	});
	
	$('#switchEng').on('click', function(){
		console.log('switch');
		i18n.setLng('en',function(t){
			$('html').i18n();
		});
		setCookie('lang', 'en', 30);	
	});

	$('#switchCes').on('click', function(){
		console.log('switch');
		i18n.setLng('cs',function(t){
			$('html').i18n();
		});
		setCookie('lang', 'cs', 30);	
	});
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}