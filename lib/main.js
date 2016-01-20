/* Swap  variables */
var templates = ['facebook', 'twitter', 'youtube', 'google', 'vkontakte', 'dribbble', 'linkedin', 'instagram'];
var text_sizes = ['140px', '100px', '125px', '105px', '150px', '130px', '120px', '150px'];
var actual = 0;

/* Function handling template swap */
function swap() {
	if (actual == templates.length) {
		actual = 0;
		var curr_site = templates[0];
		var next_site = templates[1];
	} else {
		var curr_site = templates[actual];
		var next_site = templates[actual + 1];
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

	setTimeout(function(){
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
	},4500);
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
      el.className += ' show';
    }, 20);
  }

/* Initialize JS */
$(document).ready(function(){
	console.log('initialized');
	/* Turn on templates swap */
	swap();
	var initalSrc = $('iframe').attr('src');

	var slider = document.getElementById('slider');
	var mc = new Hammer(slider);

	var slideLeft = 0;
	var slideRight = 0;
	mc.on('swipeleft', function() {
		console.log('panleft');
		if (slideLeft < 2) {
			$(slider).velocity({left: '+=-40%'}, 500);
			slideLeft++;
			slideRight--;
		};
	})

	mc.on('swiperight', function() {
		if (slideRight < 0) {
			console.log('panleft');
			$(slider).velocity({left: '+=40%'}, 500);
			slideRight++;
			slideLeft--;
		};
	})

	$('#videoWarp').on('click', function(e) {
		e.stopPropagation();
		$(this).css('display', 'none');
    	$('iframe').attr('src', initalSrc);
	});

	$('#top-button').on('click', function(e) {
		if (window.innerWidth <= 1000) {
			window.location = 'https://www.youtube.com/watch_popup?v=5EnR2eH7pcY';
		} else {
			$('iframe').attr('src', $('iframe').attr('src'));
			$('#videoWarp').css('display', 'flex');
			$('iframe').attr('src', initalSrc + '?autoplay=1');
		}
	})

	/* Hide show top introduction price arrow */
	$(document).scroll(function(){
		$('.caption-price-top').addClass('hidden');

		if (window.pageYOffset === 0 && $('.caption-price-top').hasClass('hidden')) {
			$('.caption-price-top').removeClass('hidden');
		};
	});

	$('.testimonial-container').on('click', function() {
		var win = window.open($(this).data('url'), '_blank');
		win.focus();
	});
});
