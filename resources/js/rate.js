var imgsourcedisl = ['https://image.flaticon.com/icons/svg/149/149190.svg','https://image.flaticon.com/icons/svg/148/148809.svg'];
var imgsourcelike = ['https://image.flaticon.com/icons/svg/149/149189.svg','https://image.flaticon.com/icons/svg/148/148808.svg'];
var i=1;
function rate(x){
    i=i*-1;
if(x==document.getElementById("like")){
    $("#like").attr("src",imgsourcelike[1]);
    $("#dislike").attr("src",imgsourcedisl[0]);
   $("#rate1").show();
   $("#rate").hide();
}
else{
    $("#dislike").attr("src",imgsourcedisl[1]);
    $("#like").attr("src",imgsourcelike[0]);
    $("#rate").show();
    $("#rate1").hide();
}
}


