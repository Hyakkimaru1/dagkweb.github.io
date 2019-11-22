
var imgsource = ['https://assets.catawiki.nl/assets/2019/5/22/e/f/8/ef80885e-c5c1-421a-b4c7-78b677059ca3.jpg','https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2019/10/thutuong/vietnam/joker.jpg','https://nypdecider.files.wordpress.com/2019/06/one-punch-man.jpg?quality=90&strip=all&w=646&h=431&crop=1'];
$(document).ready(function(){
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

var i = 0;
function changeImg(x){
    if (x == document.getElementById("changimgR")){
        $('#smallPic').children().eq(i).css('border','0')
       
        i++;
        if (i>(imgsource.length - 1))
            i=0;
        document.getElementById("mainPic").setAttribute("src",imgsource[i]);
        $('#smallPic').children().eq(i).css('border', '2px solid #00AEEF');
        
    }
    else {
        $('#smallPic').children().eq(i).css('border','0')
        i--;
        if (i<0)
            i=imgsource.length - 1;
        document.getElementById("mainPic").setAttribute("src",imgsource[i]);   
        $('#smallPic').children().eq(i).css('border', '2px solid #00AEEF');
    }
}


function pic(x){
    $('#smallPic').children().eq(i).css('border','0')
    for (var j = 0;j<imgsource.length;j++)
    {   
        if(imgsource[j]==x.src)
        {
            i=j;
        }
    }
    $('#smallPic').children().eq(i).css('border', '2px solid #00AEEF');
    document.getElementById("mainPic").setAttribute("src",x.src);
}

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
                $('#currendBid').text($('#primary').val())
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
          })
            
    }

});


$('#btbuyNow').click(function(){
    
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
            $('#lotOpen').hide()
          )
        }
      });
});

