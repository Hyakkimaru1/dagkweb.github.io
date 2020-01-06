
$(document).ready(function () {
  $('#smallPic').children().eq(0).css('border', '2px solid #00AEEF');
  $('#infSeller').hide();
  $('#description').click(function () {
    $('#infSeller').hide();
    $('#inf').show();
    $('#seller').css('border', '0');
    $('#description').css('border', '2px solid #BFEEFA')
  });
  $('#seller').click(function () {
    $('#inf').hide();
    $('#seller').css('border', '2px solid #BFEEFA')
    $('#infSeller').show();
    $('#description').css('border', '0');
  });
});

var minBid = parseInt($('#minBid').text());

function buyPrimary(check, pointUser) {

  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (pointUser < 80) {
      Swal.fire('Điểm đánh giá phải lớn hơn 80% tốt mới được bạn ơi!!');
    }
    else {
      if (parseInt($('#primary').val()) < minBid || $('#primary').val() == '') {
        $("#notiWrong").text("Not valid!").show().fadeOut(2000);
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
    }

  }

}

function buyAuto(check, pointUser) {
  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (pointUser < 80) {
      Swal.fire('Điểm đánh giá phải lớn hơn 80% tốt mới được bạn ơi!!');
    }
    else {
      if (parseInt($('#primaryAuto').val()) < minBid) {
        $("#notiWrongAuto").text("Not valid!").show().fadeOut(2000);
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
              $("#btPrimaryAuto").attr("action",$('#btPrimary').attr("formaction")),
              $("#inputBid").submit()
            )
          }
          else {
            Swal.fire(
              'Ra giá thất bại')
          }
        });

      }
    }

  }

}



function buyNowPro(check, pointUser) {
  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (pointUser < 80) {
      Swal.fire('Điểm đánh giá phải lớn hơn 80% tốt mới được bạn ơi!!');
    }
    else {
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
            $("#formBuyNow").submit()
          )
        }
      });
    }
  }
}


function addFavourite(check) {
    $('#btAddFavourite').hide();
    $('#addFavourite').submit();
}
