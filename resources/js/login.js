var flagLogin = true;
$(document).ready(function(){
    $('.form-login').on('submit', function(e){
      e.preventDefault();
      var flag = true;
  
      if (!$("#txtUserName").val()) {
        $("#errUserName").text("UserName is empty!");
        flag = false;
      }
      else{
        $("#errUserName").text("");
        flag = true;
      }
      
      if(!$('#password1').val())
      {
        $("#errPwd").text("Password is empty!");
        flag = false;
      }
      else{
        $("#errPwd").text("");
        flag = true;
      }
      if(flag)
      {
        this.submit();
      }
    });
  });
