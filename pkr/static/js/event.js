$(function () {
    // Set the configuration for your app
     var config = {
        apiKey: "AIzaSyCKGNlFxaq0cSV9w1r54z5ZvKv9F_L0AFg",
        authDomain: "ckr-event.firebaseapp.com",
        databaseURL: "https://ckr-event.firebaseio.com",
        projectId: "ckr-event",
        storageBucket: "ckr-event.appspot.com",
        messagingSenderId: "230381534605"
      };
   firebase.initializeApp(config);
    var database = firebase.database();

    if ($(window).innerWidth() > 767)
        try {
            var scene = $('.parallax').get(0);
            var parallax = new Parallax(scene, {
                pointerEvents: true,
                scalarX: 1,
                scalarY: 1,
                clipRelativeInput: true
            });
        } catch (e) {

        }

    var $inputs = $('.input'),
        $form = $('.event-signup__form');

    $inputs.each(function () {
        var $this = $(this),
            $input = $this.find('input'),
            $label = $this.find('label');

        $input.on('focusin change', function () {
            $this.addClass('active')
        }).on('focusout', function () {
            if ($input.val().length === 0)
                $this.removeClass('active');
        });
    });

    $form.on('submit', function (e) {
        e.preventDefault();
        if (validate_form($form)) {
            $form.find('button').addClass('loading').text('Odesílání...');

            database.ref().push({
                email: $form.find('#email').val(),
                name: $form.find('#name').val(),
                phone: $form.find('#phone').val(),
                web: $form.find('#web').val()
              }).then(function() {
                ga('gtm1.send', 'event', 'event', 'submitted-subscribe-form');
                $form.addClass('success');
              });
        }
    });

    $('.event-scroll').click(function (e) {
        e.preventDefault();
        ga('gtm1.send', 'event', 'event', $(this).data('event'));
        $('body, html').animate({scrollTop: $('.event-signup').offset().top + "px"}, 400, "swing", function () {
            $('.event-signup__field:nth-of-type(1) input').focus();
        });
    });

    $(window).on('scroll', function (e) {
        if (isInViewport($('.event-criteria__items'), 100)) {
            $('.event-criteria__items').addClass('pop');
        }
        // if (isInViewport($('.event-promo__notification'), 100)) {
        //     $('.event-promo__notification').addClass('show');
        // }
        if (isInViewport($('.event-signup__form'), 100)) {
            $('.event-signup__col--people').addClass('show');
        }
        if (isInViewport($('.event-signup__cta'), 0)) {
            $('.event-signup__cta').addClass('show');
        }

    });

    function isInViewport($element, visiblePixels) {
        var offset = $element.offset().top,
            scrollTop = $(window).scrollTop(),
            height = $(window).innerHeight();

        return (scrollTop + height) > (offset + visiblePixels);
    }

    $('body').trigger('scroll');
});
