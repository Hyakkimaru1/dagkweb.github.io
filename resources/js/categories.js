window.onscroll = function() {myFunction()};
$( window ).resize(function() {
    if ($( window ).width() < 976)
    {
        $('#myHeader').hide();
    }
    else {
        $('#myHeader').show();
    }
});

var header = document.getElementById('myHeader');
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > (sticky-37) && $( window ).width() >= 976) {
      $('#myHeader').addClass( "sticky" );
      $('#scroll').addClass( "scroll" );
    } else {
      $('#myHeader').removeClass("sticky");
      $('#scroll').removeClass("scroll");
    }
}


$(window).scroll(function(){
  if ($(this).scrollTop() > 20) {
      $('#myBtn').css('display','block')
      $('#myBtn').fadeIn();
  } else {
      $('#myBtn').fadeOut();
      $('#myBtn').css('display','none')
  }
});

//Click event to scroll to top
$('#myBtn').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
});


