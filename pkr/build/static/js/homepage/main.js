// measure scrollbar size
var scrollBarWidth = 0;
function getScrollBarWidth() {
    if ($('.content').height() <= $(window).innerHeight())
        return 0;
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    $("body").append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $(".scrollbar-measure").remove();
    return scrollbarWidth;
}
scrollBarWidth = getScrollBarWidth();
// Expand body beyond scrollbar area

var $body = $('body');

$body.css({
    'margin': "0 -" + scrollBarWidth + 'px 0 0' ,
    'overflow-x': 'hidden',
    'padding-right': $body.hasClass('menu-open') ? scrollBarWidth + 'px' : '0',
    'padding-left': $body.hasClass('menu-open') ? '0' : scrollBarWidth + 'px',
});

var $menu = $('.main-menu');
var $burger = $('.hamburger');
var $toggle = $('.menu-toggle');
var rightOffset = parseInt($toggle.css('right').replace('px', ''));

function hideMenu (){
    $menu.removeClass('menu-visible');
    $burger.removeClass('active');
    $body.removeClass('menu-open').css({'padding-right': 0});
    $toggle.css('right', '');
}

function toggleMenu (){
    $menu.toggleClass('menu-visible');
    $burger.toggleClass('active');
    $body.toggleClass('menu-open').css('padding-right', $body.hasClass('menu-open') ? scrollBarWidth + 'px' : '0');
    $toggle.css({'right': $body.hasClass('menu-open') ? rightOffset + scrollBarWidth + 'px': ''});
}

$toggle.click(function (e) {
    e.preventDefault();
    toggleMenu();

    if ($menu.hasClass('menu-visible')) {
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 27) {
                hideMenu();
            }
        });

        $(document).on("mouseup.menu touchend.menu", function (e) {
            if (!$menu.is(e.target)&& !$toggle.is(e.target) && $menu.has(e.target).length === 0 && $toggle.has(e.target).length === 0) {
                hideMenu();
                $(document).off('mouseup.menu touchend.menu');
                return false;
            }
        });

    }
});
