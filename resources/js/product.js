
$(document).ready(function(){
  $('#smallPic').children().eq(0).css('border', '2px solid #00AEEF')
    $('#infSeller').hide();
    $('#description').click(function(){
      $('#infSeller').hide();
      $('#inf').show();
      $('#seller').css( 'border','0');
      $('#description').css('border', '2px solid #BFEEFA')
    });
    $('#seller').click(function(){
      $('#inf').hide();
      $('#seller').css('border', '2px solid #BFEEFA')
      $('#infSeller').show();
      $('#description').css( 'border','0');
    });
  });

var minBid = parseInt($('#minBid').text());
$('#btPrimary').click( function(){
    if ( parseInt($('#primary').val()) < minBid){ 
           $( "#notiWrong" ).text( "Not valid!" ).show().fadeOut( 2000 );
    }
    else {
        Swal.fire({
            title: 'Bạn có đồng ý ra giá?',
            icon: 'question',
            iconHtml: '?',
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            showCancelButton: true,
            showCloseButton: true
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Ra giá thành công',
                $("#inputBid").submit()
              )
            }
            else {
                Swal.fire(
                    'Ra giá thất bại')
            }
          });
       
    }
});

$('#btPrimaryAuto').click( function(){
    if ( parseInt($('#primaryAuto').val()) < minBid)
    { 
        $( "#notiWrongAuto" ).text( "Not valid!" ).show().fadeOut( 2000 );
    }
    else {
        Swal.fire({
            title: 'Bạn có đồng ý ra giá?',
            icon: 'question',
            iconHtml: '?',
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            showCancelButton: true,
            showCloseButton: true
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Ra giá thành công'
              )
            }
            else {
                Swal.fire(
                    'Ra giá thất bại')
            }
          });
            
    }

});


$('#btbuyNow').click(function(){
    console.log($('#btbuyNow').attr("formaction"));
    Swal.fire({
        title: 'Bạn có đồng ý ra giá?',
        icon: 'question',
        iconHtml: '?',
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        showCancelButton: true,
        showCloseButton: true
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Thành Công!',
            'Xem trong giỏ hàng!',
            $('#lotClosed').show(),
            $('#lotOpen').hide(),
            $("#inputBid").attr("action", $('#btbuyNow').attr("formaction")),
            $("#inputBid").submit()
          )
        }
      });
});

