$(function () {
    var $content = $('.benchmark-box__content'),
        $tooltip = $('.benchmark-chart__tooltip'),
        $order = $tooltip.find('.order'),
        $img = $tooltip.find('img'),
        $detail = $tooltip.find('.detail'),
        bad = 50,
        mid = 75,
        hideTooltipTimeout;

    function positionPoints() {
        var $charts = $('.benchmark-chart'),
            $points = $('.benchmark-chart__point');

        $charts.each(function () {
            var $chart = $(this);

            var $points = $chart.find('.benchmark-chart__point');

            $points.each(function () {
                var $point = $(this),
                    value = parseFloat($point.data('value'));

                if (value <= bad) {
                    $point.addClass('bad');
                } else if (value <= mid) {
                    $point.addClass('mid');
                } else {
                    $point.addClass('good');
                }
                // $point.css('left', value > 0 ? 'calc(' + value + '% - 12px)' : '0%');
            });
        });

        $points.on('mouseenter', function () {
            $tooltip.fadeIn(200);
            clearTimeout(hideTooltipTimeout);
            var $this = $(this),
                eshop = $this.data('eshop');
            getTooltip($this);
            $points.removeClass('active');
            $('[data-eshop="'+ eshop +'"]').addClass('active');
        });

        $points.on('mouseleave', function () {
            hideTooltip(true);
            $('[data-eshop="'+ actual_eshop +'"]').addClass('active default');
        });
    }

    // TODO: remove after getting real data
    function generatePoints() {
        for (var a = 0; a < all_param_groups.length; a++) {
            var current_list = all_param_groups[a]
            var current_list_max = current_list[99].score
            if (a == 0) 
                current_list_max = current_list[0].score
            var $chart = $('<div class="benchmark-chart" data-id="'+ a +'" ></div>');
            for (var i = 0; i < current_list.length; i++) {
                var current_shop = current_list[i]
                var random = Math.round(Math.random()*100);
                var leftish = (current_shop.score/current_list_max) * 100
                var order = 100 - i
                var custom_class_match = ''
                if (actual_eshop == current_shop.slug) {
                    custom_class_match = 'active'
                }
                if (a == 0) 
                    leftish = (((100 - current_shop.position) + 1 ) / current_list_max) * 100
                $('<div class="benchmark-chart__point ' + custom_class_match + '" data-score="'+ current_shop.position +'" data-value="'+leftish+'" data-eshop="'+current_shop.slug+'" data-order="'+ current_shop.position +'" data-href="/detail/' + current_shop.slug + '/" data-logo="/static/img/eshops/' + current_shop.img + '" style="left: calc(' + leftish + '% - 12px);"></div>').appendTo($chart);
            }
            $chart.appendTo($('.benchmark-box__content'))
        }
        // for (var a = 0; a < 7; a++) {
        //     var $chart = $('<div class="benchmark-chart"></div>');
        //     for (var i = 0; i < 100; i++) {
        //         var random = Math.round(Math.random()*100);
        //         $('<div class="benchmark-chart__point" data-value="'+random+'" data-eshop="'+i+'" data-order="'+i+'" data-href="/detail/bonami/" data-logo="/static/img/eshops/bonami.jpg"></div>').appendTo($chart);
        //     }
        //     $chart.appendTo($('.benchmark-box__content'))
        // }
    }

    function hideTooltip(timeout) {
        hideTooltipTimeout = setTimeout(function () {
            $tooltip.fadeOut(200);
            $('.benchmark-chart__point:not(.default)').removeClass('active');
            $('.default').addClass('active');
        }, timeout ? 500 : 0);
    }

    function getTooltip($point) {
        var top = $point.offset().top,
            left = $point.offset().left;
        $tooltip.css({
            top: top - $content.offset().top + $point.height() / 2 - 40 + 'px'
        });
        if (parseFloat($point.data('value')) > 80 && $(window).innerWidth() > 980 || parseFloat($point.data('value')) > 60 && $(window).innerWidth() <= 980) {
            $tooltip.addClass('right');
            $tooltip.css({left: left - $content.offset().left - $point.width()*1.5 - $tooltip.outerWidth() + 'px'})
        } else {
            $tooltip.removeClass('right');
            $tooltip.css({left: left - $content.offset().left + $point.width()*2.5 + 'px'})
        }

        $order.text($point.data('order'));
        $detail.attr('href', $point.data('href'));
        $img.attr('src', $point.data('logo'));
    }

    $tooltip.on('mouseenter', function () {
        clearTimeout(hideTooltipTimeout);
    }).on('mouseleave', function () {
        hideTooltip(true);
    });

    $('body, html').on('keyup', function (e) {
        if (e.keyCode === 27)
            hideTooltip();
    });

    generatePoints();
    positionPoints();
    $('[data-eshop="'+ actual_eshop +'"]').addClass('active default');
});
