$(document).ready(function(){
    $('.form-confirmOTP').on('submit', function(e){
        e.preventDefault();
        var flag = true;

        if (!$("#txtOTP").val()) {
        $("#errOTP").text("Please enter your email OTP!!");
        flag = false;
        }
        else{
        $("#errOTP").text("");
        flag = true;
        }
        
        if(flag){
        this.submit();
        }
    });
});