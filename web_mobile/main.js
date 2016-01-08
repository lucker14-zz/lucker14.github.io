$(document).ready(function() {

	Daily();
	Minutelly();


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
		setCookie('lang', 'cs', 30);
		$('html').data('lang', 'cz');
	});
	
	$('#switchEng').on('click', function(){
		if ($('html').data('lang') != 'en') {
			console.log('switch');
			i18n.setLng('en',function(t){
				$('html').i18n();
			});
			setCookie('lang', 'en', 30);
			$('html').data('lang', 'en');
			moneyExchange('en');
		};
	});

	$('#switchCes').on('click', function(){
		if ($('html').data('lang') != 'cz') {
			console.log('switch');
			i18n.setLng('cs',function(t){
				$('html').i18n();
			});
			setCookie('lang', 'cs', 30);
			$('html').data('lang', 'cz');
			moneyExchange('cz');
		};
	});

	$('.go-back-button').on('click', function() {
		var thisButton = $(this);
		var popup = thisButton.parent();
		var popupWarp = popup.parent();

		popupWarp.css('display', 'none');
		$('html').css({
			'overflow-x': 'hidden',
			'overflow-y': 'auto'
		});

	});

	var popupActive = false;

	$('.service').on('click', function(e) {
		e.stopPropagation();
		$('html').css({
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		});
		var warpId = '#popup-warp-' + $(this).data('id');
		console.log(warpId)
		$(warpId).css('display', 'block');
		popupActive = true;
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


//Menici fce hodnot, aby se hybali
function Minutelly(){
	var dataRndChange = Math.random() * 1000;
	var cashRndChange = Math.random() * 200;
	var currency;

	if ($('html').data('lang') == "en") 
		currency = ' €';
	else
		currency = ' Kč';


	var rnd = Math.random() * 10;

	if (rnd <= 3.5) {
		dataRndChange *= -1;
		cashRndChange *= -1;
	};

	var newData = parseFloat($('#proof-storage-val').data('int')) + parseFloat(dataRndChange);
	var newCash = parseFloat($('#proof-cash-val').data('int')) + parseFloat(cashRndChange);

	newData = newData.toFixed(0);
	newCash = newCash.toFixed(0);

	var newDataStr = String(newData);
	var newCashStr = String(newCash);

	newDataStr = newDataStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " MB";
	newCashStr = newCashStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  + currency;

	setTimeout(function(){
		$('#proof-cash-val').html(newCashStr);
		$('#proof-cash-val').data('int', newCash);

		$('#proof-storage-val').html(newDataStr);
		$('#proof-storage-val').data('int', newData);

		Minutelly();
	}, 60000);
}

//Denni vypocet increase pro socialproof, na vsech zarizenich stejne
function Daily(){
	var currency;
	var savedDataCurrent = 376727345;
	var devDayUTS = 1450271988086;
	var dataIncrease = (Date.now() - devDayUTS) / 5000;

	var cashClear;
	var dataClear;

	if ($('html').data('lang') == "en"){
		console.log('en');
		currency = ' €';
		var savedCashCurrent = 13485;
		var cashIncrease = (Date.now() - devDayUTS) / 540000;	
	} 
	else{
		console.log('cz');
		currency = ' Kč';
		var savedCashCurrent = 364114;	
		var cashIncrease = (Date.now() - devDayUTS) / 20000;
	}

	// chunk(savedDataCurrent, 3).join(' ')

	console.log(cashIncrease);

	savedCashCurrent += cashIncrease;
	savedCashCurrent = savedCashCurrent.toFixed(0);
	cashClear = savedCashCurrent;
	savedCashCurrent = String(savedCashCurrent);
	savedCashCurrent = savedCashCurrent.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + currency;

	savedDataCurrent += dataIncrease;
	savedDataCurrent = savedDataCurrent.toFixed(0);
	dataClear = savedDataCurrent;
	savedDataCurrent = String(savedDataCurrent);
	savedDataCurrent = savedDataCurrent.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  + " MB";

	$('#proof-cash-val').html(savedCashCurrent);
	$('#proof-cash-val').data('int', cashClear);

	$('#proof-storage-val').html(savedDataCurrent);
	$('#proof-storage-val').data('int', dataClear);
}

//change currency with language
function moneyExchange (lang) {
	console.log(lang);
	var actual_val = $('#proof-cash-val').html();
	console.log('actual_val1: ' + actual_val );
	actual_val = actual_val.replace(',', '');
	console.log('actual_val2: ' + actual_val );
	actual_val = parseInt(actual_val);
	console.log('actual_val3: ' + actual_val );

	if (lang == 'en') {
		actual_val = parseInt(actual_val / 27);
		console.log('test: ' + actual_val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		console.log('actual_val4en: ' + actual_val );
		$('#proof-cash-val').html(actual_val);
		actual_val = actual_val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " €";
		console.log('actual_val5en: ' + actual_val );
		$('#proof-cash-val').html(actual_val);
	} else {
		actual_val = parseInt(actual_val * 27);
		console.log('test: ' + actual_val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		console.log('actual_val4cs: ' + actual_val );
		$('#proof-cash-val').html(actual_val);
		actual_val =  actual_val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " Kč";
		console.log('actual_val5cs: ' + actual_val );
		$('#proof-cash-val').html(actual_val);
	}	
}

//rezac textu
function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};


function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return  weekNo;
}