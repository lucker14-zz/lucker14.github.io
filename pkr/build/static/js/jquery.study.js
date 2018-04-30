$(function () {

    var methods = {
        init: function (options) {
            var self = $(this);
            var study = $.extend({
                $study: self,
                $charts: self.find('.chart'),
                $tooltips: self.find('.study-tooltip'),
                $navigationItem: $('.study-navigation__item.active'),
                $stepsCounter: $('#current'),
                $activeTooltip: null,
                activeStep: 0,
                totalSteps: self.find('.study-tooltip').length,
                tooltipOffset: 14
            }, options || {});

            self.data('study', study);

            methods._createDots.call(self);

            // Position all tooltips on page load
            methods._positionTooltips.call(self);

            var index = methods._parseLocationHash.call(self, window.location);
            methods.openDetail.call(self, index || 1, false);

            methods._initControls.call(self);

            $(window).resize(function () {
                methods._positionTooltips.call(self);
            }).on('popstate', function (e) {
                var index = methods._parseLocationHash.call(self, e.target.location);
                methods.openDetail.call(self, index || 1, false);
            });

            $('.study-navigation__iterations .total').text(study.totalSteps);

            study.$study.trigger('oninit');

            return this;
        },

        // Function called on Google charts API load
        initCharts: function () {
            var data = this.data('study');
            data.$charts.each(function () {
                var $chart = $(this);
                methods._drawChart.call(self, $chart, parseFloat($chart.data('value')), $chart.data('type'));
            });
        },

        openDetail: function (index, pushState) {
            var data = this.data('study');
            if (index !== data.activeStep) {
                data.activeStep = index;
                methods._showTooltip.call(this, data.$tooltips.parent().find('[rel="'+index+'"]'), pushState)
            }
        },

        nextStep: function () {
            var data = this.data('study');
            if (data.$activeTooltip.data('next'))
                window.location.href = data.$activeTooltip.data('next');
            else if ((data.activeStep + 1) <= data.totalSteps)
                methods.openDetail.call(this,data.activeStep + 1, true);
            else if (data.$navigationItem.next().length)
                window.location = data.$navigationItem.next().attr('href');
        },

        prevStep: function () {
            var data = this.data('study');
            if ((data.activeStep -1) >= 1)
                methods.openDetail.call(this,data.activeStep - 1, true);
            else if (data.$navigationItem.prev().length)
                window.location = data.$navigationItem.prev().attr('href')
        },

        clear: function () {
            var data = this.data('study');

            data.$activeTooltip = null;
            data.activeStep = 0;
            data.$study.removeClass('detail-opened');
            data.$tooltips.removeClass('opened in out');
            data.$tooltips.trigger('close');
            data.$navigationItem.find('.dot').removeClass('active');
            $('.event-wrapper').removeClass('opened');
        },

        _initControls: function () {
            var self = this;

            $('.study-navigation__button.next, .study-tooltip__continue').on('click', function (e) {
                e.preventDefault();
                methods.nextStep.call(self);
            });

            $('.study-navigation__button.prev').on('click', function (e) {
                e.preventDefault();
                methods.prevStep.call(self);
            });

            $('body').on('keyup', function (e) {
                if (e.keyCode === 37)
                    methods.prevStep.call(self);
                else if (e.keyCode === 39)
                    methods.nextStep.call(self);
            });
        },

        _drawChart: function ($chart, value, type) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Percentage');
            data.addRows([
                ['', 1 - value],
                ['', value]
            ]);

            var options = {
                enableInteractivity: false,
                legend: 'none',
                pieSliceText: 'none',
                height: 100,
                slices: {
                    0: {color: "#e3e7ec"},
                    1: {color: type === "good" ? "#41cc68" : "#ff576f", offset: 0.15}
                },
                chartArea: {left: 10, top: 10, width: '100%', height: '100%'}
            };

            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart($chart.get(0));
            chart.draw(data, options);
        },

        _positionTooltips: function () {
            var self = this;
            var data = self.data('study');

            data.$tooltips.each(function () {
                var $tooltip = $(this),
                    $wrapper = methods._getEventWrapper($tooltip.attr('rel')),
                    $arrow = $tooltip.find('.study-tooltip__arrow'),
                    tooltip = {
                        width: $tooltip.outerWidth(),
                        height: $tooltip.outerHeight()
                    },
                    wrapper = {
                        width: $wrapper.outerWidth(),
                        height: $wrapper.outerHeight(),
                        offset: $wrapper.offset()
                    },
                    study = {offset: data.$study.offset()};

                if ($tooltip.hasClass('top') || $tooltip.hasClass('bottom')) {
                    // Decide whether to align tooltip to item's left or right anchor
                    var leftAnchorCondition = wrapper.offset.left + (tooltip.width > wrapper.width ? tooltip.width : wrapper.width) + data.tooltipOffset * 2 < $(window).innerWidth();
                    var rightAnchorCondition = wrapper.offset.left + wrapper.width - tooltip.width - data.tooltipOffset * 2 > 0;

                    if ( leftAnchorCondition || rightAnchorCondition ) {
                        if (leftAnchorCondition) {
                            $tooltip.css({
                                left: wrapper.offset.left + 'px', // Align to left anchor
                                right: 'auto'
                            });

                            $arrow.css({
                                left: (wrapper.width / 2 - 3 < tooltip.width / 2) ? wrapper.width / 2 - 3 : 40 + 'px',
                                right: 'auto'
                            });
                        } else {
                            $tooltip.css({
                                left: wrapper.offset.left + wrapper.width - tooltip.width + 'px', // Align to right anchor
                                right: 'auto'
                            });

                            $arrow.css({
                                right: (wrapper.width / 2 - 3 < tooltip.width / 2) ? wrapper.width / 2 - 3 : 40 + 'px',
                                left: 'auto'
                            });
                        }
                    } else {
                        $tooltip.css({
                            left: wrapper.offset.left + (wrapper.width >= tooltip.width ? wrapper.width - tooltip.width : -(tooltip.width - wrapper.width) )/2 + 'px',
                            right: 'auto'
                        });
                        $arrow.css({
                            left: '50%',
                            right: 'auto'
                        })
                    }
                    $arrow.css({top: ''});
                } else if ($tooltip.hasClass('left') || $tooltip.hasClass('right')) {

                    // If side tooltip won't fit into viewport move it to the top
                    if (($tooltip.hasClass('right') && wrapper.offset.left + wrapper.width + tooltip.width + data.tooltipOffset * 2 > $(window).innerWidth()) || ($tooltip.hasClass('left') && wrapper.width + tooltip.width + data.tooltipOffset * 2 > $(window).innerWidth())) {
                        if ($tooltip.find('.study-tooltip__item').length > 1)
                            $tooltip.addClass('horizontal');
                        $tooltip.addClass('top').removeClass('left right');
                        methods._positionTooltips.call(self);
                        return false;
                    }

                    $tooltip.css({
                        top: wrapper.offset.top - study.offset.top + (wrapper.height >= tooltip.height ? wrapper.height - tooltip.height : -(tooltip.height - wrapper.height) )/2 + 'px'
                    });
                    $arrow.css({
                        top: tooltip.height / 2 + 'px'
                    });
                }

                if ($tooltip.hasClass('top')) {
                    $tooltip.css({
                        top: wrapper.offset.top - study.offset.top - tooltip.height - data.tooltipOffset + 'px'
                    });
                } else if ($tooltip.hasClass('bottom')) {
                    $tooltip.css({
                        top: wrapper.offset.top - study.offset.top + wrapper.height + data.tooltipOffset + 'px'
                    });
                } else if ($tooltip.hasClass('right')) {
                    $tooltip.css({
                        left: wrapper.offset.left + wrapper.width + data.tooltipOffset + 'px'
                    });
                } else if ($tooltip.hasClass('left')) {
                    $tooltip.css({
                        left: wrapper.offset.left - tooltip.width - data.tooltipOffset + 'px'
                    });
                }
            });
        },

        _showTooltip: function ($tooltip, pushState) {
            var data = this.data('study');

            if (data.$activeTooltip)
                methods._hideTooltip(data.$activeTooltip);

            data.$study.addClass('detail-opened');
            data.$navigationItem.find('.dot').removeClass('active');
            data.$navigationItem.find('[rel='+data.activeStep+']').addClass('active');
            data.$stepsCounter.text(data.activeStep);
            data.$activeTooltip = $tooltip;

            $tooltip.addClass('in');
            $('.event-wrapper').removeClass('opened');
            methods._getEventWrapper($tooltip.attr('rel')).addClass('opened');
            $tooltip.trigger('open');
            if (pushState)
                window.location.hash = "#" + data.activeStep;
            setTimeout(function () {
                $tooltip.removeClass('in out').addClass('opened');
            }, 300);
        },

        _hideTooltip: function ($tooltip) {
            $tooltip.addClass('out').removeClass('opened');
            methods._getEventWrapper($tooltip.attr('rel')).removeClass('opened');
            $tooltip.trigger('close');
            setTimeout(function () {
                $tooltip.removeClass('in out opened');
            }, 300);
        },

        _getEventWrapper: function (rel) {
            return $('.event-wrapper[rel=' + rel + ']');
        },

        _parseLocationHash: function (location) {
            var data = this.data('study');

            var index = parseInt(location.hash.replace('#', ''));
            if (index > 0 && index <= data.totalSteps) {
                return index;
            } else {
                window.location.hash = '';
                methods.clear.call(this);
                return false;
            }
        },

        _createDots: function () {
            var data = this.data('study');

            for (var i = 1; i <= data.totalSteps; i++)
                $('<span class="dot" rel="' + i + '">').appendTo(data.$navigationItem.find('.study-navigation__dots'));
        }
    };


    $.fn.study = function (method) {
        if (methods[method] && method.charAt(0) !== '_') {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on Study');
        }
    };
});
