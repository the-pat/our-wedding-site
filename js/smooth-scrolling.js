$('a[href*=\\#]').on('click', function(event){
  var el = $(this.hash);
  if (el.length > 0) {
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
  }
});
