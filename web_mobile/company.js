$(document).ready(function(){
	$('.logo').on('click', function(){
		window.location = 'index.html';
	});

	// i18n.init({ lng: 'cs' }, function(err, t) { 
	// 	$('html').i18n();
	// });
	
	$('#switchEng').on('click', function(){
		// console.log('switch');
		// i18n.setLng('en',function(t){
		// 	$('html').i18n();
		// });
		$('.english-only').css('display', 'block');
	});

	$('#switchCes').on('click', function(){
		// console.log('switch');
		// i18n.setLng('cs',function(t){
		// 	$('html').i18n();
		// });
		$('.english-only').css('display', 'none');
	});
});