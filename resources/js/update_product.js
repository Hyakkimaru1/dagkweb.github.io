var validImageTypes = ["image/jpeg", "image/png"];
var checkBuyNow = false;
$(document).ready(function () {
  $('#buyingNow').hide();
  $('#tenSanPham').hide();
  $('#checkBuying').click(function (event) {
    if (document.querySelector('#checkBuying').checked) {
      checkBuyNow = true;
      $('#buyingNow').show();
    }
    else {
      $('#buyingNow').hide();
      checkBuyNow = false;
    }
  });
  if ($('#img1').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg1').show();
    $('#bt_del1').click(function () {
      $('#img1').attr('src','#');
      infoArea.textContent = 'Ảnh bìa';
      $('#viewImg1').hide();
    })
  }
  if ($('#img2').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg2').show();
    $('#bt_del2').click(function () {
      $('#img2').attr('src','#');
      infoArea2.textContent = 'choose a file';
      $('#viewImg2').hide();
    })
  }
  if ($('#img3').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg3').show();
    $('#bt_del3').click(function () {
      $('#img3').attr('src','#');
      infoArea3.textContent = 'choose a file';
      $('#viewImg3').hide();
    })
  }
  if ($('#img4').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg4').show();
    $('#bt_del4').click(function () {
      $('#img4').attr('src','#');
      infoArea4.textContent = 'choose a file';
      $('#viewImg4').hide();
    })
  }
  if ($('#img5').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg5').show();
    $('#bt_del5').click(function () {
      $('#img5').attr('src','#');
      infoArea5.textContent = 'choose a file';
      $('#viewImg5').hide();
    })
  }
  if ($('#img6').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg6').show();
    $('#bt_del6').click(function () {
      $('#img6').attr('src','#');
      infoArea6.textContent = 'choose a file';
      $('#viewImg6').hide();
    })
  }
  if ($('#img7').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg7').show();
    $('#bt_del7').click(function () {
      $('#img7').attr('src','#');
      infoArea7.textContent = 'choose a file';
      $('#viewImg7').hide();
    })
  }
  if ($('#img8').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    $('#viewImg8').show();
    $('#bt_del8').click(function () {
      $('#img8').attr('src','#');
      infoArea8.textContent = 'choose a file';
      $('#viewImg8').hide();
    })
  }
});


CKEDITOR.replace('description');
var count;
var getFileMain;
//input file 1
var input = document.getElementById('file1');
var infoArea = document.getElementById('nameFile1');

input.addEventListener('change', showFileName);


function showFileName(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];
  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea.textContent = files.name;
    readURL(this);
  }
  $('#bt_del1').click(function () {
    $('#img1').attr('src','#');
    infoArea.textContent = 'Ảnh bìa';
    $('#viewImg1').hide();
  })
}

//input file 2
var input2 = document.getElementById('file2');
var infoArea2 = document.getElementById('nameFile2');

input2.addEventListener('change', showFileName2);


function showFileName2(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea2.textContent = files.name;
    readURL2(this);
  }
  $('#bt_del2').click(function () {
    $('#img2').attr('src','#');
    infoArea2.textContent = 'choose a file';
    $('#viewImg2').hide();
  })
}

//input file 3
var input3 = document.getElementById('file3');
var infoArea3 = document.getElementById('nameFile3');

input3.addEventListener('change', showFileName3);


function showFileName3(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];


  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea3.textContent = files.name;
    readURL3(this);
  }
  $('#bt_del3').click(function () {
    $('#img3').attr('src','#');
    infoArea3.textContent = 'choose a file';
    $('#viewImg3').hide();
  })
}

//input file 4
var input4 = document.getElementById('file4');
var infoArea4 = document.getElementById('nameFile4');

input4.addEventListener('change', showFileName4);


function showFileName4(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea4.textContent = files.name;
    readURL4(this);
  }
  $('#bt_del4').click(function () {
    $('#img4').attr('src','#');
    infoArea4.textContent = 'choose a file';
    $('#viewImg4').hide();
  })
}

//input file 5
var input5 = document.getElementById('file5');
var infoArea5 = document.getElementById('nameFile5');

input5.addEventListener('change', showFileName5);


function showFileName5(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea5.textContent = files.name;
    readURL5(this);
  }
  $('#bt_del5').click(function () {
    $('#img5').attr('src','#');
    infoArea5.textContent = 'choose a file';
    $('#viewImg5').hide();
  })
}

//input file 6
var input6 = document.getElementById('file6');
var infoArea6 = document.getElementById('nameFile6');

input6.addEventListener('change', showFileName6);


function showFileName6(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea6.textContent = files.name;
    readURL6(this);
  }
  $('#bt_del6').click(function () {
    $('#img6').attr('src','#');
    infoArea6.textContent = 'choose a file';
    $('#viewImg6').hide();
  })
}

//input file 7
var input7 = document.getElementById('file7');
var infoArea7 = document.getElementById('nameFile7');

input7.addEventListener('change', showFileName7);


function showFileName7(event) {
  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea7.textContent = files.name;
    readURL7(this);
  }
  $('#bt_del7').click(function () {
    $('#img7').attr('src','#');
    infoArea7.textContent = 'choose a file';
    $('#viewImg7').hide();
  })
}

//input file 8
var input8 = document.getElementById('file8');
var infoArea8 = document.getElementById('nameFile8');

input8.addEventListener('change', showFileName8);

function showFileName8(event) {

  // the change event gives us the input it occurred in 
  var input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  var files = input.files[0];

  if (!validImageTypes.includes(files['type'])) {
    // invalid file type code goes here.
    Swal.fire('Chọn file là file ảnh (có đuôi png/jpeg)');
  }
  else {
    // use fileName however fits your app best, i.e. add it into a div
    infoArea8.textContent = files.name;
    readURL8(this);
  }
  $('#bt_del8').click(function () {
    $('#img8').attr('src','#');
    infoArea8.textContent = 'choose a file';
    $('#viewImg8').hide();
  })

}

var checkBia;
function countImg() {
  count = 0;
  if ($('#img1').attr('src') !== "" && $('#img1').attr('src') !== "#") {
    count++;
    checkBia = true;
  }
  else {
    checkBia = false;
  }
  if ($('#img2').attr('src') !== "" && $('#img2').attr('src') !== '#') {
    count++;
  }
  if ($('#img3').attr('src') !== "" && $('#img3').attr('src') !== '#') {
    count++;
  }
  if ($('#img4').attr('src') !== "" && $('#img4').attr('src') !== '#') {
    count++;
  }
  if ($('#img5').attr('src') !== "" && $('#img5').attr('src') !== '#') {
    count++;
  }
  if ($('#img6').attr('src') !== "" && $('#img6').attr('src') !== '#') {
    count++;
  }
  if ($('#img7').attr('src') !== "" && $('#img7').attr('src') !== '#') {
    count++;
  }
  if ($('#img8').attr('src') !== "" && $('#img8').attr('src') !== '#') {
    count++;
  }

}

$('#btSubmit').click(function () {
  countImg();

  if ($('#firstPrice').val() === '' || $('#stepPrice').val() == '' || count < 3 || $('#weightPro').val() == '') {
    if (count < 3) {
      Swal.fire('Vui lòng thêm ít nhất 3 hình');

    }
    else {
      if (checkBia==false) {
        Swal.fire('Vui lòng chọn ảnh bìa');
      }
      else {
        Swal.fire('Vui lòng nhập đầy đủ thông tin');
      }

    }
  }
  else {

    if ($.isNumeric($('#firstPrice').val()) && $.isNumeric($('#stepPrice').val()) && $.isNumeric($('#weightPro').val())) {
      if (checkBuyNow) {
        if ($('#buyingNow').val() === '') {
          Swal.fire('Bạn chưa nhập giá bán ngay');
          return;
        }
        if (!$.isNumeric($('#buyingNow').val()) || parseInt($('#buyingNow').val()) < 0) {
          Swal.fire('Giá bán ngay phải là số nguyên không âm');
          return;
        }
      }

      if (parseFloat($('#weightPro').val()) < 0) {
        Swal.fire('Trọng lượng phải là số không âm');
        return;
      }

      if ($('#dateEnd').val() === "") {
        Swal.fire('Vui lòng chọn ngày kết thúc');
        return;
      }
      else {
        const dateEnd = new Date($('#dateEnd').val()).getTime();
        const dateNow = new Date().getTime();
        if (dateEnd < (dateNow + 259200000)) {
          Swal.fire('Vui lòng chọn ngày kết thúc từ 3 ngày từ ngày hiện tại');
          return;
        }
      }

      if (parseInt($('#firstPrice').val()) > 0 && parseInt($('#stepPrice').val()) > 0) {
        $('#form').submit();
      }
      else {
        Swal.fire('Vui lòng nhập tiền là số không âm');
        return;
      }

    }
    else {
      Swal.fire('Vui lòng nhập tiền và trọng lượng là số');
    }
  }
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg1').show();
      $('#img1').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg2').show();
      $('#img2').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL3(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg3').show();
      $('#img3').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL4(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg4').show();
      $('#img4').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL5(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg5').show();
      $('#img5').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL6(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg6').show();
      $('#img6').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL7(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg7').show();
      $('#img7').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function readURL8(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#viewImg8').show();
      $('#img8').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}
