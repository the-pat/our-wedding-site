$(function() {
    $("form#contact-form input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#contact-name").val();
            var email = $("input#contact-email").val();
            var message = $("textarea#contact-message").val();
            var gotcha = $("input#contact-gotcha").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: 'https://formspree.io/bojana.and.patrick@gmail.com',
                type: 'POST',
                data: {
                    _subject: 'Contact',
                    _gotcha: gotcha,
                    name: name,
                    email: email,
                    message: message,
                },
                dataType: 'json',
                cache: false,
                success: function() {
                    // Success message
                    $('#contact-success').html("<div class='alert alert-success'>");
                    $('#contact-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-success > .alert-success')
                        .append("<strong>Your message has been sent.</strong>");
                    $('#contact-success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contact-form').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#contact-success').html("<div class='alert alert-danger'>");
                    $('#contact-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#contact-success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#contact-success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contact-form').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#contact-name').focus(function() {
    $('#success').html('');
});
