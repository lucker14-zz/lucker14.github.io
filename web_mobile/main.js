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


//Menici fce hodnot, aby se hybali
function Minutelly(){
	var dataRndChange = Math.random() * 1000;
	var cashRndChange = Math.random() * 200;

	var rnd = Math.random() * 10;

	if (rnd <= 2) {
		dataRndChange *= -1;
		cashRndChange *= -1;
	};

	var newData = parseFloat($('#proof-storage-val').data('int')) + parseFloat(dataRndChange);
	var newCash = parseFloat($('#proof-cash-val').data('int')) + parseFloat(cashRndChange);

	newData = newData.toFixed(0);
	newCash = newCash.toFixed(0);

	var newDataStr = String(newData);
	var newCashStr = String(newCash);

	newDataStr = chunk(newDataStr, 3).join(' ') + " MB";
	newCashStr = chunk(newCashStr, 3).join(' ') + " Kč";

	setTimeout(function(){
		$('#proof-cash-val').html(newCashStr);
		$('#proof-cash-val').data('int', newCash);

		$('#proof-storage-val').html(newDataStr);
		$('#proof-storage-val').data('int', newData);

		Minutelly();
	}, 5000);
}

//Denni vypocet increase pro socialproof, na vsech zarizenich stejne
function Daily(){
	var savedCashCurrent = 364114;
	var savedDataCurrent = 376727345;
	var devDayUTS = 1450271988086;

	var dataIncrease = (Date.now() - devDayUTS) / 5000;
	var cashIncrease = (Date.now() - devDayUTS) / 20000;

	var cashClear;
	var dataClear;

	savedCashCurrent += cashIncrease;
	savedCashCurrent = savedCashCurrent.toFixed(0);
	cashClear = savedCashCurrent;
	savedCashCurrent = String(savedCashCurrent);
	savedCashCurrent = chunk(savedCashCurrent, 3).join(' ') + " Kč";

	savedDataCurrent += dataIncrease;
	savedDataCurrent = savedDataCurrent.toFixed(0);
	dataClear = savedDataCurrent;
	savedDataCurrent = String(savedDataCurrent);
	savedDataCurrent = chunk(savedDataCurrent, 3).join(' ') + " MB";

	$('#proof-cash-val').html(savedCashCurrent);
	$('#proof-cash-val').data('int', cashClear);

	$('#proof-storage-val').html(savedDataCurrent);
	$('#proof-storage-val').data('int', dataClear);
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