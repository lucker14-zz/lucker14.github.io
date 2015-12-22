//parallax elementy -> vkladaji se do pole
var videoWarpArray = [];
var videoArray = [];
var parallaxTextArray = [];
var maskArray = [];
var parallaxSpanArray = [];

var videoWarpArrayOffsets = [];
var videoWarpArrayHeight = [];

var firstScreenNadpis = $('.first-screen-nadpis');
var firstScreenPopis = $('.popis-first-screen');

var profession = $('.parallax-profese');

var breakPoint = $('.break-point');
var breakPointFirstOffset = breakPoint.offset().top;

var dashedLine = $('.circle-dashed-img');
var dashedLineCenter = dashedLine.height() / 2;
var dashedLineTotal = dashedLine.offset().top + dashedLineCenter;

var circleWarpImage = $('.circle-warp-img');
var circleOffset = circleWarpImage.offset().top;

var nadpisCycle = $('.nadpis-cycle');
var nadpisCycleOffset = nadpisCycle.offset().top;
var shortLineActive = $('.short-line-active');

var bubble = $('#bubble1');

//obrazky kruhu
var image1 = $('.analyza-img');
var image2 = $('.navrh-img');
var image3 = $('.implementace-img');
var image4 = $('.monitorovani-img');


//popisky kruhu.
var text1 = $('.inside-text-1');
var text2 = $('.inside-text-2');
var text3 = $('.inside-text-3');
var text4 = $('.inside-text-4');


//default values pro velocity transform. Resi startovaci pozice v popiskach kruhu.
$.Velocity.hook(text1, "translateX", "-50%");
$.Velocity.hook(text1, "translateY", "-51%");
$.Velocity.hook(text2, "translateY", "-20%");
$.Velocity.hook(text3, "translateY", "-20%");
$.Velocity.hook(text4, "translateY", "-20%");
$.Velocity.hook(text2, "translateX", "-50%");
$.Velocity.hook(text3, "translateX", "-50%");
$.Velocity.hook(text4, "translateX", "-50%");


var textCircle1 = $('.text-circle-1');
var textCircle2 = $('.text-circle-2');
var textCircle3 = $('.text-circle-3');
var textCircle4 = $('.text-circle-4');

//bool pro aktivaci prvni lajny v kruhu (ta ktera leze do analyzy)
var activeShortLine = false;

//pomocna promenne pro timeline
var step;
var lastVideo;

var shaked = false;


//Menici fce hodnot, aby se hybali
function Minutelly(){
	var dataRndChange = Math.random() * 1000;
	var cashRndChange = Math.random() * 200;

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

//nacita texty a elementy do pole ktere se pak pouzije jako parallax element. Je to dynamicky podle poctu video elementu na strance. Pokud upravis pocet v html musis i tady.
var elementCountPlusOne = 8;
for (var i = 1; i <= elementCountPlusOne; i++) {
	//priprava video elementu a jejich vlastosti
	var video = $('#video' + i);
	var videoWarp = $('#video-warp-' + i);
	var videoOffset = videoWarp.offset();
	var videoOffsetTop = videoOffset.top;
	var videoHeight = videoWarp.height();

	// some more logic -> od indexu 2 se zacinaji az nacitat do pole. Predtim jenom videa.
	if (i >= 2) {
		//tohle je fakt divny. Moc nevim proc to funguje. :D Musel jsem to menit a tohle byl quckfix.
		var parallaxText = $('#bubble' + (i - 1));
	}

	//pushuje parallax elementy do array
	parallaxTextArray.push(parallaxText);
	videoWarpArray.push(videoWarp);
	videoArray.push(video);
	//maskArray.push(maskText);
	//parallaxSpanArray.push(parallaxSpan);

	//pushuje vysku a offset do array. Aby se pak na kazdem scrollu nemusel zjistovat offset -> Optimalizace
	videoWarpArrayOffsets.push(videoOffsetTop);
	videoWarpArrayHeight.push(videoHeight);
};

// $('.bubble').each(function(){
// 	parallaxTextArray.push($(this));
// });

var windowHeight = window.innerHeight;

//scroll position -> From top
var lastPosition = -1

//radius kruhu
var radius = ($('.circle-dashed-img').width() / 2);
//Tady by se melo resit to ze kdyz to ze kdyz to resiznes tak to bude dal fungovat. -> Nefunguje to :D
$( window ).resize(function() {
	window.scrollTo(0, 0);
  windowHeight = window.innerHeight;
	lastPosition = window.pageYOffset;
	scroll(loop);
	textResize();
});

//kdyz das refresh tak to skoci na top. Urcite nechat. Je to lepsi pro flow.
$(window).bind('beforeunload',function(){
	window.scrollTo(0, 0);
});

//upravuje velikost kruhu a textu based on resolution change. Nefuguje. Neresil jsem to.
function textResize() {
	var insideCircleText = $('.inside-text');
	var circleWarp = $('.circle-warp-img');
	var circleWarpCenter = circleWarp.height() / 2;

	var insideCircleTextWidth = insideCircleText.width() / 2;
	var insideCircleTextHeight = insideCircleText.height() / 2;

	radius = $('.circle-dashed-img').width() / 2;

	insideCircleText.css({
		width: ((circleWarpCenter * 2) - 350) + 'px',
		top: '50%',
		left: '50%'
	});
};

textResize();

//offset kruhu
var s = $('.break-point');
var positionBreakPoint = s.offset();
//maxvalue resi bod kde se ma kruh zastavit na konci. (U kontaktu) -> Ten kruh je na dlouhem elementu a scrolluje na position fixed.
var maxvalue = $(document).outerHeight() - $(".black-background").outerHeight() - s.outerHeight() - 200;

//zavola req animation frame na kazdym frame. S fallbackem pro IE. Urcite nechat.
var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             function(callback){ window.setTimeout(callback, 1000/60) };

//funkce co resi samotnej scroll.
function loop() {

	

	if (shaked === false) {
		var el = document.querySelector('.mouse');
		if(isElementInViewport(el) == true){
			$('.mouse').effect('shake', {times:'2', distance:'5', direction:'up'} , 'slow');
			shaked = true;
		} 
	};

	//if scroll position is different do something else do nothing.
	if (lastPosition == (window.pageYOffset + (window.innerHeight / 2))) {
      scroll(loop);
      return false;
  } else lastPosition = window.pageYOffset + (window.innerHeight / 2);

  //vola parallax funkce
	playVideo();
	prepereParallax();

	switchToFixedCircle();
	moveShortLine();

	

  scroll(loop);
};

//pripravy parallax. Checkuje kde presne na strance ses. Eg jestli se tvuj scrollposition schoduje s elementem a pak zapne parallax pro ten dany element. -> Performance.
function prepereParallax() {
	for (var i = 0; i < videoWarpArray.length; i++) {
		var top = videoWarpArrayOffsets[i];
		var end = top + videoWarpArrayHeight[i];

		//pokud scroll position odpovida jednomu z elementu do shit.
		if (lastPosition >= top && lastPosition <= end) {
			var index = i;
			//parallax elementu
			parallaxAnimate(index, top);
		}
	};
}



//Prepne kruh z absolute na fixed a obracne pokud prejedes bod. Chtelo by to optimalizovat.
function switchToFixedCircle() {
	//windowpos by se tady nemel vytvaret mas ho uz nahore. Very easy fix.
	var windowpos = $(window).scrollTop() - 20;
	if (windowpos >= positionBreakPoint.top && windowpos < maxvalue) {
			//var offset = s.offset().top - window.pageYOffset;
			s.attr("style", ""); //kill absolute positioning
			s.addClass("stick");
			var drawPosition = lastPosition - breakPointFirstOffset;
			draw((drawPosition / 5000) + startValue);
		} else if (windowpos >= maxvalue) {
			s.removeClass('stick'); //un-stick
			s.css({
				position: "absolute",
				top: maxvalue + "px",
				left: '50%',
				transform: 'translateX(-50%)'
			}); //set sticker right above the footer
		} else {
			s.removeClass();
	}
}

//pohni linku na zacatku analyzy a kruhu. A lot of magic numbers. Ale who cares.
function moveShortLine() {
	if (lastPosition >= nadpisCycleOffset + 200) {
		var firstMovePosition = lastPosition - nadpisCycleOffset;
		if (firstMovePosition > 350) {
			if (activeShortLine === false) {
				shortLineActive.velocity({
					translateY: '190px'
				}, 300)
				activeShortLine = true;
			}
		}

		if (firstMovePosition < 350) {
			if (activeShortLine === true) {
				shortLineActive.velocity({
					translateY: '0px'
				}, 300)
				activeShortLine = false;
			}
		}

		if (firstMovePosition < 350) {
			image1.removeClass('analyze-active-img');
		}else if(firstMovePosition >= 350 && firstMovePosition <= 700) {
			image1.addClass('analyze-active-img');
		}
	}
};

//Kontroluje kde ses na strance a pousti pouze aktualni video. Nebude spouset dalsich 18
function playVideo() {
	for (var i = 0; i < videoWarpArray.length; i++) {
		timelineCheck();
		videoArray[i].get(0).pause();
		var top = videoWarpArrayOffsets[i];
		var endOffTop = top + videoWarpArrayHeight[i];

		if (lastPosition >= top && lastPosition <= endOffTop) {
			if (videoArray[i].get(0).paused) {
				videoArray[i].get(0).play();
				timelineRender(i);


				// if (i != lastVideo) {
				// 	var pTop = String($('.timeline-pointer').css('top'));// + step * i;

				// 	pTop = pTop.substr(0, pTop.length - 2);

				// 	console.log(pTop);

				// 	if (i > lastVideo) {
				// 		pTop = parseFloat(pTop) + step;
				// 	} else if (i < lastVideo) {
				// 		pTop = parseFloat(pTop) - step;
				// 	}					

				// 	console.log('pTop: ' + pTop);

				// 	$('.timeline-pointer').animate({top: pTop},'fast');	
				// };
				

				// lastVideo = i;
			}
		}
	}
};

//handluje zmenu class pointu na timeline pri scrollu
function timelineRender (video_id) {
	// console.log(step);

	var id = '#timeline-point-' + (video_id + 1);

	if ($(id).hasClass('actual') == false) 
		$(id).toggleClass('actual'); 
	if ($(id).hasClass('past')) 
		$(id).removeClass('past'); 

	$('.timeline-point').each(function() {
		if ($(this).data('id') > (video_id + 1)) {
			if ($(this).hasClass('actual'))
				$(this).removeClass('actual');
			if ($(this).hasClass('past'))
				$(this).removeClass('past');
		} else if ($(this).data('id') < (video_id + 1)) {
			if ($(this).hasClass('actual'))
				$(this).removeClass('actual');
			if ($(this).hasClass('past') == false)
				$(this).addClass('past');
		}
	});
}

//kontroluje jestli se jeste ma zobrazit timeline
function timelineCheck() {
	var id = '#video-warp-' + videoWarpArray.length;

	// console.log($(id).height());
	// console.log($(id).offset().top);
	// console.log(window.pageYOffset);

	var stickOffset = $(id).offset().top + ($(id).height()) * 3;
	var timelineOffset = $(id).offset().top + ($(id).height()) / 2;
	var timelineStartOffset = $('#video-warp-2').offset().top / 1.5;

	// console.log(newOffset);

	if (window.pageYOffset < stickOffset) {
		// $('.timeline-wrap').show();
		$('.break-point').removeClass('stick');
	} else if (window.pageYOffset > stickOffset) {
		// $('.timeline-wrap').hide();
		$('.break-point').addClass('stick');

	} 

	if (window.pageYOffset < timelineOffset && window.pageYOffset > timelineStartOffset && $('.timeline-wrap').css('display') == 'none') {
		$('.timeline-wrap').show();
		// $('.break-point').toggleClass('stick');
	} else if ((window.pageYOffset > timelineOffset || window.pageYOffset < timelineStartOffset) && $('.timeline-wrap').css('display') == 'block') {
		$('.timeline-wrap').hide();
		// $('.break-point').toggleClass('stick');
	} 

	// if(window.pageYOffset > timelineStartOffset && $('.timeline-wrap').css('display') == 'none'){
	// 	$('.timeline-wrap').show();
	// } else if (window.pageYOffset < timelineStartOffset && $('.timeline-wrap').css('display') == 'block'){
	// 	$('.timeline-wrap').hide();
	// }

	// if (window.pageYOffset < newOffset && $('.cycle-wrap').css('display') == 'none') {
	// 	$('.cycle-warp').hide();
	// } else if (window.pageYOffset > $(id).offset().top && $('.cycle-wrap').css('display') == 'block') {
	// 	$('.cycle-warp').show();
	// } 
}



//animace parallax elementu.
function parallaxAnimate(index, top) {
	//spomaleni pripadne zrychleni.
	var parallaxNumber = ((windowHeight / 2) / 100) * 30;

	//animace uplne prvniho textu. Ne bublin ale textu na prvni strance.
	if (index === 0) {
		var pageYOffset = window.pageYOffset;
		// firstScreenNadpis.css('transform', 'translate3d(-0%, ' + Math.round(-pageYOffset) + 'px ,0px)');
		// firstScreenPopis.css('transform', 'translate3d(-0%, ' + Math.round(-pageYOffset) + 'px ,0px)');
	}
	//Animuje elementy -> Urcite pouzivat translate3d pokud se bude upravovat.
	console.log(Math.round((-(lastPosition - top) * 1.2)));
	if (index > 0) {
		parallaxTextArray[index].css('transform', 'translate3d(-50%, ' + Math.round((-(lastPosition - top) * 1.2)) + 'px ,0px)');
	}
};

//po kliknuti na sipku te to posle o screen dolu
$('.down-cta').on('click', function() {
	var parent = $(this).parent();
	var parentOffset = parent.offset();
	var parentHeight = parent.height();

	var destination = parentOffset.top + parentHeight;

	$('html, body').animate({
    scrollTop: destination + 'px'
 	}, 400, 'swing');

});

//Modry CTA. Posle  te to dolu.
$('.button-first').on('click', function() {
	var parent = $(this).parent();
	var parentOffset = parent.offset();
	var parentHeight = parent.height();

	var destination = parentOffset.top + parentHeight;

	$('html, body').animate({
    scrollTop: destination + 'px'
 	}, 400, 'swing');

});

//Jsou prvni 2 videa nactena?
var videoBool1 = false;
var videoBool2 = false;

//Ozvi se az bude 1 video nacteno
videoArray[0].on('loadeddata', function() {
	videoBool1 = true
	checkLoading();
});

//Ozvi se az bude 2 video nacteno
videoArray[1].on('loadeddata', function() {
	videoBool2 = true;
	checkLoading();
});

//Pokud nacteno sundej loading screen.
function checkLoading() {
	if (videoBool1) {
		if (videoBool2) {
			$('.loading-screen').css('display', 'none');
			$('body').css('overflow-y', 'visible');
		}
	}
};

//Canvas pro ten kruh.
var startValue = 1.45;
var endValue = 3.45;

var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var height = c.height;
var width = c.width;

//Vykresli kruh na scroll
function draw(val) {
	console.log('draw ' +  val);
	clearCanvas();
	ctx.beginPath();
	ctx.arc(width/2,height/2 , radius,1.5*Math.PI,val*Math.PI);
  ctx.lineWidth = 6;
  ctx.strokeStyle="#cad6dd";
	ctx.stroke();
  ctx.closePath();
  var point = getPoint(val);
  ctx.beginPath();
  ctx.arc(point.x + width/2 ,point.y + height/2 ,8,0,2*Math.PI);
  ctx.fillStyle = "#cad6dd";
  ctx.fill();
  ctx.closePath();
  checkPoint(val);
};

//Holy shit sorry :() Cely checkPoint resi prepinany aktivnich a neaktivnich obrazku v kruhu a zmenu textu na scroll v kruhu. Je to fakt dlouhy a prasacky. Val je current PI vypocitany ze scrollu.
var wasActive = false;
var wasActive2 = false;
var wasActive3 = false;

function skipScrollUp(){
	var cycleWarpOffset = $('.cycle-warp').offset().top;
	var cycleWarpJumpScroll = $('.cycle-warp').height() / 8;

	var jumpScroll = cycleWarpOffset;
	if (window.pageYOffset > jumpScroll) {
		$("html").velocity("stop");
		$("html").velocity("scroll", { offset: jumpScroll + 'px', mobileHA: false });
	};
}

function checkPoint(val) {
	if (val < 1.51) {
		image1.removeClass('analyza-active-img');
		textCircle1.removeClass('strong-font');
	}else if(val <= 2.08){
		if (wasActive) {
			image2.removeClass('navrh-active-img');
			textCircle1.removeClass('strong-font');
			textCircle2.removeClass('strong-font');
			text1.velocity("stop")
			text1.velocity({
				translateY: '-51%',
				translateX: '-50%',
				opacity: 1,
			}, "easeInQuad", 250);
			text2.velocity("stop")
			text2.velocity({
				translateY: '-20%',
				translateX: '-50%',
				opacity: 0
			}, "easeInQuad", 250);
			wasActive = false;
		};
	}else if(val <= 2.51) {
		image3.removeClass('implementace-active-img');
		textCircle1.removeClass('strong-font');
		textCircle2.removeClass('strong-font');
		textCircle3.removeClass('strong-font');
		if (wasActive2) {
			text2.velocity("stop")
			text2.velocity({
				translateY: '-51%',
				translateX: '-50%',
				opacity: 1,
			},"easeInQuad", 250);
			text3.velocity("stop")
			text3.velocity({
				translateY: '-20%',
				translateX: '-50%',
				opacity: 0
			},"easeInQuad",  250);
			wasActive2 = false;
		}
	}else if(val <= 3.13) {
		image4.removeClass('monitorovani-active-img');
		textCircle1.removeClass('strong-font');
		textCircle2.removeClass('strong-font');
		textCircle3.removeClass('strong-font');
		textCircle4.removeClass('strong-font');
		if (wasActive3) {
			text3.velocity("stop")
			text3.velocity({
				translateY: '-51%',
				translateX: '-50%',
				opacity: 1
			}, "easeInQuad", 250);
			text4.velocity("stop")
			text4.velocity({
				translateY: '-20%',
				translateX: '-50%',
				opacity: 0
			},"easeInQuad", 250);
			wasActive3 = false;
		}
	}

	if (val <= 1.99 && val >= 1.51) {
		textCircle1.addClass('strong-font');
	}

	if (val >= 1.99 && val < 2.51) {
		image2.addClass('navrh-active-img');
		textCircle2.addClass('strong-font');
		if (wasActive === false) {
			text1.velocity("stop")
			text1.velocity({
				translateY: '-80%',
				translateX: '-50%',
				opacity: 0,
				visibility: 'hidden'
			},"easeInQuad", 250);
			text2.velocity("stop")
			text2.velocity({
				translateY: '-51%',
				translateX: '-50%',
				opacity: 1,
				visibility: 'visible'
			},"easeInQuad", 250);
			wasActive = true;
		}
	}else	if (val >= 2.47 && val <= 2.96) {
		image3.addClass('implementace-active-img');
		textCircle3.addClass('strong-font');
		if (wasActive2 === false) {
			text2.velocity("stop")
			text2.velocity({
				translateY: '-80%',
				translateX: '-50%',
				opacity: 0,
				visibility: 'hidden'
			},"easeInQuad", 250);
			text3.velocity("stop")
			text3.velocity({
				translateY: '-51%',
				translateX: '-50%',
				opacity: 1,
				visibility: 'visible'
			},"easeInQuad", 250);
			wasActive2 = true;
		}
	}



	if (val >= 2.96 && val <= 3.13) {
		image4.addClass('monitorovani-active-img');
		textCircle4.addClass('strong-font');
		text3.velocity("stop");
		text3.velocity({
			translateY: '-80%',
			translateX: '-50%',
			opacity: 0
		},"easeInQuad", 250);
		text4.velocity("stop");
		text4.velocity({
			translateY: '-51%',
			translateX: '-50%',
			opacity: 1
		},"easeInQuad", 250);
		wasActive3 = true;
	}

}


//vycisti canvas na kazdej frame
function clearCanvas() {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
};

//Funkce pro to aby si placnul bod pred tou carou na scroll
function getPoint(val) {
  var angle = val * Math.PI;

  var x = Math.cos(angle) * (radius);
  var y = Math.sin(angle) * (radius );

  var coords = {x: x, y: y};

  return coords;
}

function positionTimeline(count){
	for (var i = 1; i <= count; i++) {
		var currId = '#timeline-point-' + i;
		var margin = ((windowHeight / 2) / count ) - 10 + 'px';

		// $(currId).css('margin-top', margin);


		if (i == 1) {
			$(currId).css('margin-top', margin / 2);
		} else if(i == count) {
			$(currId).css('margin-top', margin);
			$(currId).css('margin-bottom', margin / 2);
		} else {
			$(currId).css('margin-top', margin);
		}
	};
}

$(window).resize(function() {
	var count = videoWarpArray.length + 1;
	
	step = $('#timeline-point-2').css('margin-top');

	step = parseFloat(step) + 9;

	positionTimeline(count);
});




$('.click').on('click', function(e) {
	$('.click').removeClass('selected-menu');
	e.preventDefault();
	var thisItem = $(this);
	thisItem.addClass('selected-menu');
	var data = thisItem.data();
	var id = '#' + data.jump;
	var offset = $(id).offset().top;
	$('html').velocity('scroll',{duration: 2000, offset: offset + 'px'});
});

//Tady jsou veci pro zobrazeni popupu
var popupActive = false;

$('.button-odkaz').on('click', function(e) {
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

$(window).on('click', function() {
	if (popupActive) {
	$('html').css({
			'overflow-x': 'hidden',
			'overflow-y': 'auto'
		});
		$('.popup-warp').css('display', 'none');
	};
});

$('.popup').on('click', function(e) {
	e.stopPropagation();
})

$('.go-back-button').on('click', function() {
	var thisButton = $(this);
	var popup = thisButton.parent();
	var popupWarp = popup.parent();

	popupWarp.css('display', 'none');
	$('html').css({
		'overflow-x': 'hidden',
		'overflow-y': 'auto'
	});

})

//submit Formulare

$('#formSubmit').submit(function(e) {
	e.preventDefault();

	if ($('.email-msg').length > 0) {
		$('.email-msg').remove();
	}

	var formVal = $( "input:first" ).val();
	if (isEmail(formVal)) {
		$('.warp-input').append('<p class="email-msg" style="color: #37C737;font-size: 26px;margin-top: -5px;">Děkujeme!<p>')
	}else{
		$('.warp-input').append('<p class="email-msg" style="color: #F34E4E;font-size: 26px;margin-top: -5px;">Špatný formát emailu.<p>')
	}

});

$('.circle-img').on('click', function() {
	var cycleWarpOffset = $('.cycle-warp').offset().top;
	var cycleWarpJumpScroll = $('.cycle-warp').height() / 8;

	$('.circle-img').on('click', function() {
		var jumpScroll = cycleWarpOffset + (cycleWarpJumpScroll * $(this).data('offset'));
		$("html").velocity("stop");
		$("html").velocity("scroll", { offset: jumpScroll + 'px', mobileHA: false });
	});
});

//timeline initialisation

$(document).ready(function() {

	$('.href-about').on('click', function(){
		window.location = 'company.html';
	});

	Daily();
	Minutelly();


	var ofset = ($('.timeline').height() / (videoWarpArray.length + 1));

	for (var i = 1; i < videoWarpArray.length + 1; i++) {
		var top = 0 + (ofset * (i-1) - (i-1) * 9);

		if (i == 2) {
			step = top + 9;
		};

		if (i != 1 || i != videoWarpArray.length + 1) {
			var ele = '<div class="timeline-point" data-id="' + i + '" id="timeline-point-'+ i +'"></div>';
			
			$('.timeline').append(ele);
		};

		 positionTimeline(videoWarpArray.length + 1);
	};


	console.log(step);

	var pointer = '<div class="timeline-pointer" ><p class="timeline-pointer-text"></p></div>';

	$('.timeline-wrap').append(pointer);

	console.log($('#timeline-point-1').offset());
	console.log($('.timeline-wrap').offset());

	var pointerOffset = $('#timeline-point-1').offset().top - $('.timeline-point').height() * 0.5;

	$('.timeline-pointer').offset({top: pointerOffset});

	$('#timeline-point-1').toggleClass('actual');

	// na kliknuti pointu timliny posle na dane video

	$('.timeline-point').on('click', function() {
		var data_id = $(this).data('id');
		var id = '#video-warp-' +  data_id;

		console.log(id);

		var videoOffset = $(id).offset().top;

		$("html").velocity("stop");
		$("html").velocity("scroll", { offset: videoOffset + 'px', mobileHA: false });
		
	});

	$('.timeline-point').mouseenter( function() {
		var mineid = $(this).data('id') - 1;
		$('.timeline-pointer').css('display', 'block');
		$('.timeline-pointer-text').html('#' + $(this).data('id'));

		var pointerOffset = ($('#timeline-point-1').offset().top + (step * mineid)) - $('.timeline-point').height() / 2;
		$('.timeline-pointer').offset({top: pointerOffset});
	});

	$('.timeline-point').mouseleave( function() {
		$('.timeline-pointer').css('display', 'none');
	});

	$('.mouse').mouseenter(function() {
		$('.mouse').effect('shake', {times:'2', distance:'5', direction:'up'} , 'slow');
	});


	console.log('step: ' + step);
 
 	
	//start shake on button enter viewport	

	$('#button-odkaz-1').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
	     console.log('U in');
	     setTimeout(looper, 500);
	   },
	   doOut: function() {
	   	console.log('U out');
	   },
	   tolerance: 0,
	   throttle: 50,
	   toggleClass: 'onScreen',
	   lazyAttr: null,
	   lazyPlaceholder: 'someImage.jpg',
	   debug: false
	});


	//translation initialisation
	i18n.init({ lng: 'cs' }, function(err, t) { 
		$('html').i18n();
	});
	
	$('#switchEng').on('click', function(){
		console.log('switch');
		i18n.setLng('en',function(t){
			$('html').i18n();
		});

		$('#knowMore').css('width', '605px');	
		setCookie('lang', 'en', 30);
		// $('#billboard2').css('padding-bottom', '30px');
	});

	$('#switchCes').on('click', function(){
		console.log('switch');
		i18n.setLng('cs',function(t){
			$('html').i18n();
		});

		$('#knowMore').css('width', '605px');
		setCookie('lang', 'cs', 30);	
		// $('#billboard2').css('padding-bottom', '90px');

	});

	//Firefox
 $('.cycle-warp').bind('DOMMouseScroll', function(e){
     if(e.originalEvent.detail < 0) {
         //scroll down
         console.log('Down1');
     }else {
         //scroll up
         console.log('Up1');
         skipScrollUp();
     }
 });

 //IE, Opera, Safari
 $('.cycle-warp').bind('mousewheel', function(e){
     if(e.originalEvent.wheelDelta < 0) {
         //scroll down
         console.log('Down2');
     }else if(e.originalEvent.wheelDelta > 100) {
         //scroll up
         console.log('Up2');
         skipScrollUp();
     }else if(e.originalEvent.wheelDelta = 0){
     	console.log('stay');
     }
 });

});


function isEmail(val) {
	var reg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	return reg.test(val);
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function looper(){
	var id = '';

	$.each($('.inside-text'),function() {
		if ($(this).css('opacity') == 1) 
			id = '#button-odkaz-' + $(this).data('id');
	});

  // use callback function of the effect to call the outer looper function recursively.

	$(id).effect('shake', {times:'1', distance:'2', direction:'up'} , 'slow', function() {
	    	setTimeout(looper, 2000); // add a timeout of needed
	});

};

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

$(window).load(function() {
	


	// if (getCookie('lang') == '') {
	// 	setCookie('lang', 'cs', 356);
	// 	console.log('cookie lang:' + getCookie('lang'));

		
	// };
});

//prvni zapnuti rekurzivni funkce ktera checkuje scroll.
loop();




