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
	});

	$('#switchCes').on('click', function(){
		console.log('switch');
		i18n.setLng('cs',function(t){
			$('html').i18n();
		});
		setCookie('lang', 'cs', 30);
	});

	$('body').css('overflow-x', 'visible');
	$('body').css('overflow-y', 'visible');

});