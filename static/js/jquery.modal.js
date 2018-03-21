$.fn.modal = function(default_url) {
    var timeout;
    var $modals = $(this);

     // measure scrollbar size
    var scrollBarWidth = 0;
    function getScrollBarWidth() {
        if ($('.main-content').height() <= $(window).innerHeight())
            return 0;
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'section-modal-scrollbar-measure';
        $("body").append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        $(".section-modal-scrollbar-measure").remove();
        return scrollbarWidth;
    }
    scrollBarWidth = getScrollBarWidth();
    // Expand body beyond scrollbar area
    $('body').css({
        'margin': "0 -" + scrollBarWidth + 'px',
        'overflow-x': 'hidden',
        'padding-right': $('body').hasClass('section-modal-open') ? scrollBarWidth + 'px' : '0',
        'padding-left': $('body').hasClass('section-modal-open') ? '0' : scrollBarWidth + 'px',
        'height': 'auto'
    });

    if (default_url) {
        var $active_modal = $modals.filter('.show');
        if (typeof history.replaceState == "function") {
            if ($active_modal.length)
                history.replaceState({'action': 'open_modal', 'href': $active_modal.data('href')}, '', '');
            else
                history.replaceState({action: 'close_modal'}, '', '');
        }
    }

    $('.section-modal-shadow').on('click', function(e) {
        // ignore middle mouse button
        if (e.which !== 2) {
            $('[class*="modal"].open.show').trigger("close");
        }
    });

    $('.modal').on('click', function(e) {
        // ignore middle mouse button
        if (e.which !== 2 && $(e.target).closest('.modal-content').length === 0) {
            $('[class*="modal"].open.show').trigger("close");
        }
    });

    $modals.each(function() {
        var $modal = $(this);
        var modal_url = $modal.data('href');

        function close(history_pushstate) {
            if ($modal.hasClass('disable-close'))
                return false;
            if (history_pushstate && default_url && typeof history.pushState == "function")
                history.pushState({action: 'close_modal'}, '', default_url);

            $modal.removeClass('open').css({"overflow-y": ""});
            $('body').removeClass("section-modal-open").css('padding-right', "0");
            $('.section-modal-shadow').css('visibility', 'visible');

            clearTimeout(timeout);
            timeout = setTimeout(function() {
                $modal.trigger('afterclose');
                $modal.removeClass('show');
                $('.section-modal-shadow').css('visibility', '');
            }, 300);
        }

        function open(history_pushstate) {
            $modal.trigger('beforeopen');
            if (history_pushstate && default_url && typeof history.pushState == "function"){
                history.pushState({action: 'open_modal', href: modal_url}, '', modal_url);

            }

            $modal.addClass('show');

            clearTimeout(timeout);
            timeout = setTimeout(function() {
                /**
                 * Fix for safari scroll bug - force reinitialization of overflow for modal
                 * */
                $modal.addClass('open').css({"overflow-y": "auto"});
                $modal.trigger('afteropen');
            }, 100);

            $('body').addClass('section-modal-open').css('padding-right', scrollBarWidth + "px");
        }

        $modal.find('.modal-closer, .section-modal-closer').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            close(true);
        });

        // chrome workaround
        $modal.on('mousewheel', function(e) {});

        $(window).on('keyup', function(e) {
            if ($modal.hasClass('show')) {
                if (e.which == 27) // escape
                    close(true);
            }
        });

        $(window).bind('popstate', function(event) {
            var state = event.originalEvent.state;
            if(state !== null) {
                if (state.action == 'close_modal') {
                    if ($modal.hasClass('show')) {
                        close(false);
                    }
                }
                if (state.action == 'open_modal') {
                    if (modal_url == state.href) {
                        open(false);
                    }
                }
            }
        });

        $('a[href="' + modal_url + '"]').on('click', function(e) {
            e.preventDefault();
            open(true);
        });

        $modal.on('click', 'a[href="' + default_url + '"]', function(e) {
            e.preventDefault();
            close(true);
        });

        $modal.on('open', function() {
            open(true);
        });

        $modal.on('close', function(e) {
            close(true);
        });
    });
};
