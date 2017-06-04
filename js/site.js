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
    });
    $row.addClass('form-group row');

    $col.append($label).append($input);
    $row.append($col);

    i++;
    var $nextRow = $('<div>', { id: 'guest' + i });
    $row.after($nextRow);
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
});
