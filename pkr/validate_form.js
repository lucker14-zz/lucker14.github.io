function validate_form($this) {

    // status = ready for submission and is returned by this function
    var status = true;

    $this.find('.field').each(function (index, field) {
        var $field = $(field);
        var input = $field.find('select, input, textarea')[0];
        var select = $field.find('select')[0];
        var error = false;

        if ($field.hasClass('required')) {
            if (select) {
                var index = $(select).prop('selectedIndex');

                // something has to be selected
                if (index <= 0) {
                    error = true;
                }
            } else if (input) {
                var value = $(input).val();
                if (value != '') {

                    // if email format is set, validate against regexp
                    if ($field.data('format') == 'email') {
                        var exp = /^([\w\+\_\-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        if (!exp.test(value)) {
                            error = true;
                        }
                    }
                }
                else {
                    error = true;
                }
            }
        }

        if (error) {
            $field.find('.messages').html('<span class="msg msg-alert">' + $field.data('alert') + '</span>');
            $field.addClass('invalid');
            status = false;
        }
        else {
            $field.find('.messages').html('');
            $field.removeClass('invalid');
        }

    });

    return status;
}
