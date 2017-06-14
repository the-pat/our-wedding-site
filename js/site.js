$(function() {
  var addGuest = function() {
    var i = 1;
    $('#rsvp-add-guest').click(function() {
      var $row = $('#guest-' + i);
      var $col = $('<div>', { class: 'col-lg-12' });
      var $label = $('<label>', {
        for: 'rsvp-guest-' + i,
        class: 'col-form-label',
        text: 'Guest ' + i,
      });
      var $input = $('<input>', {
        id: 'rsvp-guest-' + i,
        type: 'text',
        name: 'Guest ' + i,
        class: 'form-control',
        placeholder: 'Your guest name'
      });
      var $p = $('<p>', { class: 'help-block text-danger' });

      $row.addClass('row');
      $col.append($label).append($input).append($p);
      $row.append($col);

      i++;
      var $nextRow = $('<div>', { id: 'guest-' + i });
      $row.after($nextRow);
    });
  };

  $(document).ready(function() {
    addGuest();
  });

  $('form#rsvp-form input,textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event) {},
    submitSuccess: function($form, event) {
      event.preventDefault();

      var name = $("input#rsvp-name").val();
      var email = $("input#rsvp-email").val();
      var address1 = $("input#rsvp-address-1").val();
      var address2 = $("input#rsvp-address-2").val();
      var city = $("input#rsvp-city").val();
      var state = $("input#rsvp-state").val();
      var zip = $("input#rsvp-zip").val();
      var country = $('select#rsvp-country').val();
      var gotcha = $("input#rsvp-gotcha").val();
      var firstName = name;

      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
      }

      var data = {
        name,
        email,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        gotcha,
      };

      var $guests = $('input[id^="rsvp-guest-"]');
      $.each($guests, function(key, value) {
        data[value.name] = value.value;
      });

      $.ajax({
        url: 'https://formspree.io/bojana.and.patrick@gmail.com',
        type: 'POST',
        data,
        dataType: 'json',
        cache: false,
        success: function() {
            // Success message
            $('#rsvp-success').html("<div class='alert alert-success'>");
            $('#rsvp-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#rsvp-success > .alert-success')
                .append("<strong>Your message has been sent.</strong>");
            $('#rsvp-success > .alert-success')
                .append('</div>');

            //clear all fields
            $('#rsvp-form').trigger("reset");
        },
        error: function() {
            // Fail message
            $('#rsvp-success').html("<div class='alert alert-danger'>");
            $('#rsvp-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#rsvp-success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#rsvp-success > .alert-danger').append('</div>');
            //clear all fields
            $('#rsvp-form').trigger("reset");
        },
      })
    },
  });
});
