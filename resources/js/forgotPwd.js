$(document).ready(function(){
    $('.form-resetPwd').on('submit', function(e){
      e.preventDefault();
      var flag = true;
  
      if (!$("#txtEmail").val()) {
        $("#errEmail").text("Email is empty!");
        flag = false;
      }
      else{
        $("#errEmail").text("");
        flag = true;
      }
      
      if(flag){
        this.submit();
      }
    });
  });