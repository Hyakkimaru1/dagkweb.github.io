
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
    $('#id_DM_cha').val(i.firstChild.innerHTML);
    $('#cateChild').show();
    $('#selected1').empty();
    $('#btNext').css('cursor','not-allowed');
    $('#selected').append(i.firstChild.innerHTML);
}

function chooseChild(i){
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
    i.style.color="red";

    $('#selected1').append(" > ");
    $('#id_DM_con').val(i.firstChild.innerHTML);
    $('#selected1').append(i.firstChild.innerHTML);
    $('#btNext').css('cursor','pointer');
}

$('#btNext').click(function() { 
    if ($('#productName').val() !== '' && $('#selected1').text() !=='')
    {
        $('#nameCate_Product').submit();
    }
});
