
$(document).ready(function(){

    $('#btHome').css('cursor','pointer');
   $('#btNext').css('cursor','not-allowed');
});

$("input").change(function() {
    $('#productNameNull').empty();
        $('#productName').css('border','1px solid #CED4DA');
}).trigger("change");

function choose(i){

    if ($('#productName').val() == '' && $('#productNameNull').text()=='')
    {
        $('#productNameNull').append("Không được để trống tên sản phẩm");
        $('#productName').css('border','1px solid red');
    }
    else if ($('#productName').val() !== ''){
        $('#productNameNull').empty();
        $('#productName').css('border','1px solid #CED4DA');
    }
    
    $('#selected').empty();
    var maxParent = $('#cateParent').children().length;
    for (var j = 0;j < maxParent; j++)
    {   
        if($('#cateParent').children().eq(j)!=i)
        {
            $('#cateParent').children().eq(j).css('color','');
        }
    }
    var maxChild = $('#cateChild').children().length;
    for (var j = 0;j < maxChild; j++)
    {   
            $('#cateChild').children().eq(j).css('color','');
    }
    i.style.color="red";
    $('#cateChild').show();
    $('#cateChild2').hide();
    $('#selected1').empty();
    $('#selected2').empty();
    $('#btNext').css('cursor','not-allowed');
    $('#selected').append(i.firstChild.innerHTML);
}

function chooseChild(i){
    $('#selected2').empty();
    $('#selected1').empty();
    if ($('#productName').val() == '' && $('#productNameNull').text()=='')
    {
        $('#productNameNull').append("Không được để trống tên sản phẩm");
        $('#productName').css('border','1px solid red');
    }
    else if ($('#productName').val() !== ''){
        $('#productNameNull').empty();
        $('#productName').css('border','1px solid #CED4DA');
    }
    var maxParent = $('#cateChild').children().length;
    for (var j = 0;j < maxParent; j++)
    {   
        if($('#cateChild').children().eq(j)!=i)
        {
            $('#cateChild').children().eq(j).css('color','');
        }
    }
    var maxChild = $('#cateChild2').children().length;
    for (var j = 0;j < maxChild; j++)
    {   
            $('#cateChild2').children().eq(j).css('color','');
    }
    i.style.color="red";
    $('#cateChild2').show();
    $('#selected1').append(" > ");
    $('#selected1').append(i.firstChild.innerHTML);
    $('#btNext').css('cursor','not-allowed');
}

function chooseChild2(i){
    $('#selected2').empty();
    if ($('#productName').val() == '' && $('#productNameNull').text()=='')
    {
        $('#productNameNull').append("Không được để trống tên sản phẩm");
        $('#productName').css('border','1px solid red');
    }
    else if ($('#productName').val() !== ''){
        $('#productNameNull').empty();
        $('#productName').css('border','1px solid #CED4DA');
    }
    var max = $('#cateChild2').children().length;
    for (var j = 0;j < max; j++)
    {   
        if($('#cateChild2').children().eq(j)!=i)
        {
            $('#cateChild2').children().eq(j).css('color','');
        }
    }
    i.style.color="red";
    $('#selected2').append(" > ");
    $('#selected2').append(i.firstChild.innerHTML);
    $('#btNext').css('cursor','pointer');
}


$('#btNext').click(function() { 
    if ($('#productName').val() !== '' && $('#selected2').text() !=='')
    {
        $('#nameCate_Product').submit();
    }
});
