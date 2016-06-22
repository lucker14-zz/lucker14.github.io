var absImages = new Image();
absImages.src = 'img/abs_images.jpg';

var psBlured = new Image();
psBlured.src = 'https://1771529460.rsc.cdn77.org/img/ps-bgBlured.png';

absImages.onload = function() {
	$('.img-abs').addClass('img-abs-big');
}

psBlured.onload = function() {
	$('.photoshop-blured').addClass('photoshop-blured-big');
}

// var then = new Date(1453730400000);

/* Countdown vars */
var countdownEl = $('.countdown-timer');
var start = new Date();
start.setHours(start.getHours(),0,0,0);
var then = new Date(start.getTime() + 1 * 60 * 60 * 1000);

/* Init vars */
var slideLeft = 0;
var slideRight = 0;

/* Swap  variables */
var templates = ['facebook', 'twitter', 'youtube', 'google', 'vkontakte', 'dribbble', 'linkedin', 'instagram'];
var text_sizes;
if ($(window).width() >= 1000) {
	text_sizes = ['130px', '95px', '120px', '100px', '145px', '125px', '115px', '145px'];
} else {
	text_sizes = ['70px', '60px', '70px', '60px', '86px', '75px', '70px', '86px'];
}
var timer;

$(window).on('resize', function() {
	if ($(window).width() >= 1000) {
		text_sizes = ['130px', '95px', '120px', '100px', '145px', '125px', '115px', '145px'];
	} else {
		text_sizes = ['70px', '50px', '60px', '50px', '75px', '65px', '60px', '75px'];
	}
});

var actual = 0;

/* Function handling template swap */
function swap(template_id) {
	var timeout = 4500;

	// console.log(template_id);

	if (template_id === undefined){
		// console.log('2');
		if (actual == templates.length) {
			actual = 0;
			var curr_site = $('.active-icon').attr('id');
			var next_site = templates[1];
		} else {
			var curr_site = $('.active-icon').attr('id');
			var next_site = templates[actual + 1];
		}
	} else if (typeof(template_id !== undefined)) {
		// console.log('1');
		// console.log($('.active-icon').attr('id'));
		var curr_site = $('.active-icon').attr('id');
		var next_site = templates[template_id];
		timeout = 100;
		actual = template_id - 1;
	}


	if (next_site === undefined) {
		next_site = 'facebook';
	};

	var grad_curr_id = '.bg-grad.' + curr_site;
	var grad_next_id = '.bg-grad.' + next_site;
	var icon_curr_id = '.social-icon.' + curr_site;
	var icon_next_id = '.social-icon.' + next_site;

	var currSmallMac = '.' + curr_site + '-small-mac';
	var nextSmallMac = '.' + next_site + '-small-mac';
	var currSmallIphone = '.' + curr_site + '-small-iphone';
	var nextSmallIphone = '.' + next_site + '-small-iphone';
	var currBigIphone = '.' + curr_site + '-big-iphone';
	var nextBigIphone = '.' + next_site + '-big-iphone';
	var currMacbookIphone = '.' + curr_site + '-big-macbook';
	var nextMacbookIphone = '.' + next_site + '-big-macbook';


	actual = (actual == templates.length ? 0 : actual + 1);

	timer =setTimeout(function(){
		$(grad_curr_id).css('opacity', '0');
		$(grad_next_id).css('opacity', '1');
		$(currSmallMac).css('opacity', '0');
		$(nextSmallMac).css('opacity', '1');
		$(currSmallIphone).css('opacity', '0');
		$(nextSmallIphone).css('opacity', '1');
		$(currBigIphone).css('opacity', '0');
		$(nextBigIphone).css('opacity', '1');
		$(currMacbookIphone).css('opacity', '0');
		$(nextMacbookIphone).css('opacity', '1');
		$('#buy-button-top').removeClass(curr_site);
		$('#buy-button-top').addClass(next_site);
		$(icon_curr_id).removeClass('active-icon');
		$(icon_next_id).addClass('active-icon');
		setText(next_site);
		swap();
	},timeout);
}

/* Swap template names in heading view, accepts string parameter with template name, called in swap() */
function setText(value) {
	// if (typeof(value) == 'undefined')
	// 	value = 'facebook';
	var container = $('.social-networks');
    var prev = container.find('.network');
    prev.addClass('hide');


    setTimeout(function() {
      prev.remove();
    }, 300);

    var el = document.createElement('span');
    el.textContent = value;
    el.className += ' network';

    container.append(el);
    container.css('width', text_sizes[actual]);

    setTimeout(function() {
      $('.network').addClass('show');
    }, 20);
  }

// /* Carousel auto movement function */
// function move_carousel () {
// 	setTimeout(function(){
// 		var addition = (parseInt($('#step1').css('width')) / window.innerWidth) * 100;
// 		if (slideRight < 0) {
// 			$(slider).velocity({left: '+=' + addition + '%'}, 500);
// 			slideRight++;
// 			slideLeft--;
// 		} else if (slideLeft < 2){
// 			$(slider).velocity({left: '-=' + addition + '%'}, 500);
// 			slideLeft++;
// 			slideRight--;
// 		}
// 		move_carousel();
// 	}, 6000);
// }

var videoTrackingTimeoutId;

/* Initialize JS */
$(document).ready(function(){
	var initalSrc = $('iframe').attr('src');

	// var slider = document.getElementById('slider');
	// var mc = new Hammer(slider);

	console.log('initialized');
	/* Turn on templates swap */
	swap();

	/* Carousel auto movement start */
	// move_carousel();

	// mc.on('swipeleft', function() {
	// 	var addition = (parseInt($('#step1').css('width')) / window.innerWidth) * 100;
	// 	// console.log('panleft');
	// 	// console.log(addition);
	// 	if (slideLeft < 2) {
	// 		$(slider).velocity({left: '-=' + addition + '%'}, 500);
	// 		slideLeft++;
	// 		slideRight--;
	// 	};
	// })

	// mc.on('swiperight', function() {
	// 	var addition = (parseInt($('#step1').css('width')) / window.innerWidth) * 100;
	// 	if (slideRight < 0) {
	// 		$(slider).velocity({left: '+=' + addition + '%'}, 500);
	// 		slideRight++;
	// 		slideLeft--;
	// 	};
	// })

	$('#videoWarp').on('click', function(e) {
		e.stopPropagation();
		$(this).css('display', 'none');
    	$('iframe').attr('src', initalSrc);
    	if (videoTrackingTimeoutId) {
    		clearTimeout(videoTrackingTimeoutId);
    	}
	});

	$('.badge').on('click', function(){
		$('.abs-box').velocity('scroll', {
            duration: 1000,
            offset: -70,
            easing: 'ease-in-out'
        });
	})

	var empty = function(){
		return true;
	}

	$('.new-btn').on('click', function(){
		console.log('run colorbox');
		$.fancybox($('.gal'), {arrows: true, nextClick: true, modal: false});
		// $('a.gal').colorbox({rel: 'gal'});
		// $.colorbox({ maxWidth: '80%', retinaImage: true, rel: true});
		// $.colorbox({ maxWidth: '80%', retinaImage: true, href: 'img/ad_templates/ad_newsfeed_1.png'},{href: 'img/ad_templates/Ads_Carousel.png'});
	})

	$('#top-button').on('click', function(e) {
		if (window.innerWidth <= 1000) {
			window.location = 'https://www.youtube.com/watch_popup?v=5EnR2eH7pcY';
		} else {
			$('iframe').attr('src', $('iframe').attr('src'));
			$('#videoWarp').css('display', 'flex');
			$('iframe').attr('src', initalSrc + '?autoplay=1');
			videoTrackingTimeoutId = setTimeout(function(){
				adroll_track('video_watch');
				ga('send', 'event', 'video', '40-seconds');
			}, 40000);
		}
	})

	/* Hide show top introduction price arrow */
	$(document).scroll(function(){
		$('.caption-price-top').addClass('hidden');

		if (window.pageYOffset === 0 && $('.caption-price-top').hasClass('hidden')) {
			$('.caption-price-top').removeClass('hidden');
		};
	});

	/* Opens new tab with original tweet */
	$('.testimonial-container').on('click', function() {
		var win = window.open($(this).data('url'), '_blank');
		win.focus();
	});

	/* Handles click on social-icon */
	$('.social-icon').on('click', function() {
		// console.log($(this).data('template'));
		clearTimeout(timer);
		swap($(this).data('template'));
	});

	/* countdown things */
	var now  = new Date();
	// var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
	// var d = moment.duration(ms);
	// var s = Math.floor(d.asHours()) + 'h' + moment.utc(ms).format(" mm") + 'm' + moment.utc(ms).format(" ss") + 's';
	// $('.countdown-timer').html(s);

	// console.log(now);
	// console.log(d);

	var previus = new Date();
	setInterval(function() {
		var now  = new Date();
		var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"), "DD/MM/YYYY HH:mm:ss", false) ;
		var d = moment.duration(ms);
		var s = Math.floor(d.asHours()) + 'h' + moment.utc(ms).format(" mm") + 'm' + moment.utc(ms).format(" ss") + 's';
		if (true) {};
		if (previus != now) {
			$('.countdown-timer').html(s);
			previus = now;
		};

		// console.log(now);
		// console.log(d);

	}, 1000)
});


/* URI parsing */
$(function() {
	var hash = window.location.hash;

	var jiri = '#tsqcj4';
	var james = '#qrpcj8';
	var cheaper = '#89pc2sk';
	var cheapest = '#sk2pc89';
	var Alton = '#xrc2q7';

	if (location.search && location.search.indexOf('producthunt') > -1) {
		$('#bot-button').html('$19.99 - Buy now');
		$('#buy-button-top').html('$19.99 - Buy now');
		$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkit-pro-producthunt/');
		$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkit-pro-producthunt/');
		$('.caption-price-top').hide(0);
		$('#producthunt').addClass('active');
	}
	// else if (hash == cheaper) {
	// 	$('#bot-button').html('$23.99 - Buy now');
	// 	$('#buy-button-top').html('$23.99 - Buy now');
	// 	$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkitkit-pro-40/');
	// 	$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkitkit-pro-40/');
	// } else if(hash == cheapest){
	// 	$('#bot-button').html('$14.99 - Buy now');
	// 	$('#buy-button-top').html('$14.99 - Buy now');
	// 	$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkit-pro-users/');
	// 	$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkit-pro-users/');
	// }
	 else if (hash == james) {
		$('#bot-button').html('$29.99 - Buy now');
		$('#buy-button-top').html('$29.99 - Buy now');
		$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkit-pro-qxc/');
		$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkit-pro-qxc/');
	} else if (hash == jiri) {
		$('#bot-button').html('$29.99 - Buy now');
		$('#buy-button-top').html('$29.99 - Buy now');
		$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkit-pro-jsx/');
		$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkit-pro-jsx/');
	} else if (hash == Alton) {
		$('#bot-button').html('$29.99 - Buy now');
		$('#buy-button-top').html('$29.99 - Buy now');
		$('#buy-button-top').attr('href', 'https://madebysource.com/payment/socialkitkit-pro-xrc2q7/');
		$('#bot-button').attr('href', 'https://madebysource.com/payment/socialkitkit-pro-xrc2q7/');
	}

});


