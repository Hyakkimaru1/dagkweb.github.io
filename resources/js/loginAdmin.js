$(document).ready(function(){
    $('.form-login').on('submit', function(e){
      e.preventDefault();
      var flag = true;
  
      if (!$("#txtEmail").val()) {
        $("#errEmail").text("Email is empty!");
        flag = false;
      }
      else if(false){//kiem tra tu server
        $("#errEmail").text("This email hasn't register!");
        flag = false;
      }
      else{
        $("#errEmail").text("");
        flag = true;
      }
      
      if(!$('#password1').val())
      {
        $("#errPwd").text("Password is empty!");
        flag = false;
      }
      else if(false){//kiem tra password tu server
        $("#errPwd").text("Password was wrong!");
        flag = false;
      }
      else{
        $("#errPwd").text("");
        flag = true;
      }

      if(flag){
        if ($("#txtEmail").val() === 'admin' && $('#password1').val()==='admin'){
          this.submit();
        }
        else{
          $("#errPwd").text("Email or password was wrong!");
        }
      }
    });
  });