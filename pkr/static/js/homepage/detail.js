$(function () {
    if ($(window).innerWidth() > 375) {
        var $menu, $study, $progress, $hrefs, $categories, menuOffset, active, order;

        function setVariables() {
            $menu = $('.detail-menu');
            $menu.removeClass('fixed  bottom');
            $study = $('.detail-study');
            $progress = $menu.find('.detail-menu__progress');
            $hrefs = $menu.find('.detail-menu__href');
            $categories = $study.find('h4');
            menuOffset = $menu.offset().top;
            active = "#cart";
            order = 0;
            $(window).trigger('scroll');
        }

        setVariables();

        $(window).on('scroll', function(e) {
            var scrollTop = $(window).scrollTop();

            if (scrollTop >= (menuOffset - 20)) {
                if ((scrollTop + $menu.outerHeight() + 70) < ($study.outerHeight() + $study.offset().top)) {
                    $menu.addClass('fixed').removeClass('bottom');
                    $progress.css({'height': Math.round(((scrollTop - $study.offset().top) / $study.outerHeight())*100) + "%"})
                }
                else {
                    $menu.addClass('bottom').removeClass('fixed');
                    $progress.css({'height': "100%"})
                }
                $categories.each(function (elem, index) {
                    if ($(this).offset().top - 50 <= scrollTop) {
                        order = elem;
                        active = $(this).attr('id');
                    }
                });
                $hrefs.removeClass('active');
                $menu.find("[href='#" + active + "']").addClass('active');
            } else {
                $menu.removeClass('fixed bottom');
                $hrefs.removeClass('active');
                $hrefs.first().addClass('active');
                $progress.css({'height': "0"})
            }
            $('.active-order').text("0" + (order + 1));
        });

        $hrefs.on('click', function (e) {
            e.preventDefault();
            $('body, html').animate({scrollTop: $($(this).attr('href')).offset().top - 20 + "px"}, 300);
        });


        $(window).on('resize', function () {
            setVariables();
        });
    }
});
