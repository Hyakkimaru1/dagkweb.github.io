
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

function buyPrimary(check,checkBuy,maxAuto,isCurMaxAuto,pointUser) {
  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (checkBuy === 0) {
      if (pointUser < 80) {
        Swal.fire('Điểm đánh giá phải lớn hơn 80% tốt mới được bạn ơi!!');
        return;
      }
      else {
        if (parseInt($('#primary').val()) < minBid || $('#primary').val() == '') {
          $("#notiWrong").text("Not valid!").show().fadeOut(2000);
        }
        else {
          const GiaChenh = parseInt($('#primary').val()) - parseInt($('#currendBid').text());
          const BuocGia = (minBid - parseInt($('#currendBid').text()));
          if (GiaChenh % BuocGia !== 0) {
            $("#notiWrong").text("Bước giá bội của " + BuocGia).show().fadeOut(3000);
            const rcmPrice = parseInt($('#primary').val()) - GiaChenh%BuocGia;
            $("#examplePrimay").text("ex: "+ rcmPrice).show();
          }
          else {
            if (isCurMaxAuto)
            {
              if (parseInt($('#primary').val()) > maxAuto)
              {
                Swal.fire({
                  title: 'Bạn có đồng ý ra giá? Sẽ kết thúc giá tự động của bạn!',
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
              else 
              {
                Swal.fire('Giá bạn đang đưa ra bé hơn giá tự động của bạn lúc nãy: '+maxAuto +' !!');
                return;
              }
            }
            else  {
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
    }
    else {
      if (parseInt($('#primary').val()) < minBid || $('#primary').val() == '') {
        $("#notiWrong").text("Not valid!").show().fadeOut(2000);
      }
      else {
        const GiaChenh = parseInt($('#primary').val()) - parseInt($('#currendBid').text());
        const BuocGia = (minBid - parseInt($('#currendBid').text()));
        if (GiaChenh % BuocGia !== 0) {
          $("#notiWrong").text("Bước giá bội của " + BuocGia).show().fadeOut(3000);
          const rcmPrice = parseInt($('#primary').val()) - GiaChenh%BuocGia;
            $("#examplePrimay").text("ex: "+ rcmPrice).show();
        }
        else {
          if (isCurMaxAuto)
          {
            if (parseInt($('#primary').val()) > maxAuto)
            {
              Swal.fire({
                title: 'Bạn có đồng ý ra giá? Sẽ kết thúc giá tự động của bạn!',
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
            else 
            {
              Swal.fire('Giá bạn đang đưa ra bé hơn giá tự động của bạn lúc nãy: '+maxAuto +' !!');
              return;
            }
          }
          else  {
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


  }

}

function buyAuto(check,checkBuy,maxAuto,isCurMaxAuto,pointUser ) {
  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (checkBuy === 0) {
      if (pointUser < 80) {
        Swal.fire('Điểm đánh giá phải lớn hơn 80% tốt mới được bạn ơi!!');
      }
      else {
        if (parseInt($('#primaryAuto').val()) < minBid) {
          $("#notiWrongAuto").text("Not valid!").show().fadeOut(2000);
        }
        else {
          const GiaChenh = parseInt($('#primaryAuto').val()) - parseInt($('#currendBid').text());
          const BuocGia = (minBid - parseInt($('#currendBid').text()));
          if (GiaChenh % BuocGia !== 0) {
            $("#notiWrongAuto").text("Bước giá bội của " + BuocGia).show().fadeOut(3000);
            const rcmPrice = parseInt($('#primaryAuto').val()) - GiaChenh%BuocGia;
            $("#exampleAuto").text("ex: "+ rcmPrice).show();
          }
          else {
            if (isCurMaxAuto)
            {
              if (parseInt($('#primaryAuto').val()) > maxAuto)
              {
                Swal.fire({
                  title: 'Bạn có muốn đưa giá thêm giá tự động này thay cho giá cũ?',
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
                      $("#inputBid").attr("action", $('#btPrimaryAuto').attr("formaction")),
                      $("#inputBid").submit()
                    )
                  }
                  else {
                    Swal.fire(
                      'Ra giá thất bại')
                  }
                });
              }
              else 
              {
                Swal.fire('Giá bạn đang đưa ra bé hơn giá tự động của bạn lúc nãy: '+maxAuto +' !!');
                return;
              }
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
                    $("#inputBid").attr("action", $('#btPrimaryAuto').attr("formaction")),
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
    }
    else {
      if (parseInt($('#primaryAuto').val()) < minBid) {
        $("#notiWrongAuto").text("Not valid!").show().fadeOut(2000);
      }
      else {
        const GiaChenh = parseInt($('#primaryAuto').val()) - parseInt($('#currendBid').text());
        const BuocGia = (minBid - parseInt($('#currendBid').text()));
        if (GiaChenh % BuocGia !== 0) {
          $("#notiWrongAuto").text("Bước giá bội của " + BuocGia).show().fadeOut(3000);
          const rcmPrice = parseInt($('#primaryAuto').val()) - GiaChenh%BuocGia;
            $("#exampleAuto").text("ex: "+ rcmPrice).show();
        }
        else {
          if (isCurMaxAuto)
          {
            if (parseInt($('#primaryAuto').val()) > maxAuto)
            {
              Swal.fire({
                title: 'Bạn có muốn đưa giá thêm giá tự động này thay cho giá cũ?',
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
                    $("#inputBid").attr("action", $('#btPrimaryAuto').attr("formaction")),
                    $("#inputBid").submit()
                  )
                }
                else {
                  Swal.fire(
                    'Ra giá thất bại')
                }
              });
            }
            else 
            {
              Swal.fire('Giá bạn đang đưa ra bé hơn giá tự động của bạn lúc nãy: '+maxAuto +' !!');
              return;
            }
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
                  $("#inputBid").attr("action", $('#btPrimaryAuto').attr("formaction")),
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
  }

}


function buyNowPro(check, pointUser, checkBuy) {
  if (check === false) {
    Swal.fire('Vui lòng đăng nhập');
  }
  else {
    if (checkBuy === 0) {
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


$('#examplePrimay').click(function() {
 
  const temp = $("#examplePrimay").text();
  const valuePrimary = temp.substr(3,temp.length - 3);

  $('#primary').val( parseInt(valuePrimary));
})

$('#exampleAuto').click(function() {
  const temp = $("#exampleAuto").text();
  const valuePrimary = temp.substr(3,temp.length - 3);
  $('#primaryAuto').val( parseInt(valuePrimary));
})
