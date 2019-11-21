$(document).ready(function(){
  $('.form-newPwd').on('submit', function(e){
    e.preventDefault();
    var flag = true;

    if (!$('#password1').val()) {
      $("#errPwd").text(" Password is empty!");
      flag = false;
    }
    else if($('#password1').val().length < 6){
      $("#errPwd").text(" Password must have 6-8 characters.");
      flag = false;
    }
    else{
      $("#errPwd").text("");
      flag = true;
    }

    if (!$('#password2').val()) {
      $("#errCfpwd").text(" Confirm Password is empty!");
      flag = false;
    }
    else if($('#password1').val() != $("#password2").val()){
      $("#errCfpwd").text(" Password don't match.");
      flag = false;
    }
    else{
      $("#errPwd").text("");
      flag = true;
    }
    
    if(flag){
      this.submit();
    }
  });
});