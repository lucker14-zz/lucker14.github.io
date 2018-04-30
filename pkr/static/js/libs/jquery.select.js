$.fn.select = function () {
    var $selects = $(this);
    $selects.each(function () {
        var $select = $(this);
        var $htmlSelect = $select.find('select');
        $htmlSelect.on('change', function () {
            $select.find('.option').text($htmlSelect.find('option:selected').text());
            window.location = $htmlSelect.find('option:selected').data('href');
        });
    });
};
