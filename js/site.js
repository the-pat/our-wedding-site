var addGuest = function() {
  var i = 1;
  $('#addGuest').click(function() {
    var $row = $('#guest' + i);
    var $col = $('<div>', { class: 'col-lg-8 col-md-12' });
    var $label = $('<label>', {
      for: 'txtGuest' + i,
      class: 'col-form-label',
      text: 'Guest ' + i,
    });
    var $input = $('<input>', {
      id: 'txtGuest' + i,
      type: 'text',
      name: 'Guest' + i,
      class: "form-control border-olive",
      placeholder: 'Guest ' + i + ' Name',
    });
    $row.addClass('form-group row');

    $col.append($label).append($input);
    $row.append($col);

    i++;
    var $nextRow = $('<div>', { id: 'guest' + i });
    $row.after($nextRow);
  });
};

var bindCountries = function(data) {
  var $ddl = $('#ddlCountry');

  $.each(data, function() {
    var $option = $('<option>', {
      value: this,
      html: this,
    });

    $ddl.append($option);
  });
};

$(document).ready(function() {
  addGuest();

  // Smooth scrolling
  $('a[href*=\\#]').on('click', function(event){
    var el = $(this.hash);
    if (el.length > 0) {
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    }
  });

  // Get countries
  $.ajax({
    url: 'http://country.io/names.json',
    dataType: 'jsonp',
    success: bindCountries,
  });

  //$.getJSON('http://country.io/names.json', bindCountries);
});
