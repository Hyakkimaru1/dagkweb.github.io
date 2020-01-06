
$(document).ready(function () {
  $('#smallPic').children().eq(0).css('border', '2px solid #00AEEF');
  $('#infSeller').hide();
  $('#btBackEdit').hide();
  $('#descriptionE').click(function () {
    $('#infSeller').hide();
    $('#inf').show();
    $('#seller').css('border', '0');
    $('#descriptionE').css('border', '2px solid #BFEEFA')
  });
  $('#seller').click(function () {
    $('#inf').hide();
    $('#seller').css('border', '2px solid #BFEEFA')
    $('#infSeller').show();
    $('#descriptionE').css('border', '0');
  });
});
CKEDITOR.replace('descriptionEdit');

function delBidder(id_NM,id_SP){
    Swal.fire({
      title: 'Bạn muốn từ chối lượt ra giá của người dùng ' + $('#bidder1').text() + ' ?',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Từ chối thành công!',
          $('#id_NM').val(id_NM),
          $('#id_SP').val(id_SP),
          $('#formDeny').submit()
        )
      }
    });
}


function newDir() {
  Swal.fire({
    title: 'Bạn có muốn thêm mô tả?',
    icon: 'question',
    iconHtml: '?',
    confirmButtonText: 'YES',
    cancelButtonText: 'NO',
    showCancelButton: true,
    showCloseButton: true
  }).then((result) => {
    if (result.value) {
      let currentdate = new Date();
      let valueEdit = $('#editNew').val();
      let descriptionEdit = CKEDITOR.instances.descriptionEdit.getData();
      let datetime = valueEdit + "<br>" + "<i class=\"fas fa-pencil-alt\"></i> " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + "<br>" + descriptionEdit;
      $('#editNew').val(datetime);
      $('#formEditNew').submit()
    }
  });
}


