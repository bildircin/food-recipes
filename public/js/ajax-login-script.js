jQuery(document).ready(function($) {

    // Perform AJAX login on form submit
    $('#login').on('submit', function(e){
        $('#login-loader').fadeIn('fast');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajax_login_object.ajax_url,
            data: {
                'action': 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
                'username': $('#login #username').val(),
                'password': $('#login #password').val(),
                'security': $('#login #security').val()
            },
            success: function(data){
                $('#login-loader').fadeOut('fast');
                $('#login .status').text(data.message).fadeIn("slow");
                if (data.loggedin == true){
                    document.location.href = ajax_login_object.redirect_url;
                }
            }
        });
        e.preventDefault();
    });
});