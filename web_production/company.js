$(document).ready(function(){
	i18n.init({ lng: 'cs' }, function(err, t) {
		$('html').i18n();
	});

	$('#switchEng').on('click', function(){
		console.log('switch');
		i18n.setLng('en',function(t){
			$('html').i18n();
		});
		setCookie('lang', 'en', 30);
		$('.english-only').css('display', 'block');
	});

	$('#switchCes').on('click', function(){
		console.log('switch');
		i18n.setLng('cs',function(t){
			$('html').i18n();
		});
		setCookie('lang', 'cs', 30);
		$('.english-only').css('display', 'none');
	});

	$('body').css('overflow-x', 'visible');
	$('body').css('overflow-y', 'visible');

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