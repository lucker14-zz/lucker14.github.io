$(function () {
    var $browsers = $('.browser.comparison'),
        dragging = false;

    $browsers.each(function () {
        var $browser = $(this),
        $button = $browser.find('.browser__button');

        $button.on("touchmove", function (e) {
            e.preventDefault();
            move(e.pageX - $browser.offset().left, $browser);
        });

        $button.on('mousedown', function () {
            dragging = true;
        });

        $browser.on('mousemove', function (e) {
            if (dragging) {
                move(e.pageX - $browser.offset().left, $browser);
            }
        });
    });

    $(window).on('mouseup', function () {
        dragging = false;
    });

    function move(x, $browser) {
        var width = $browser.width();
        if (x < 0)
            x = 0;
        else if (x > width)
            x = width;

        $browser.find('.browser__slider').css({
            left: x + 'px'
        });
        $browser.find('.browser__wrapper').css({
            transform: 'translate3d(' + (x) + 'px, 0, 0)'
        });
        $browser.find('.browser__image').css({
            transform: 'translate3d(' + (-1 * x) + 'px, 0, 0)'
        });
    }
});
