$(document).ready(function(){
    $('#form-manage').on('submit', function (e) {
        e.preventDefault();
        var flag = true;
        if (!$("#curPwd").val()) {
            $("#errCurPwd").text("Please fill out current password!");
            flag = false;
        }
        else {
            $("#errCurPwd").text("");
            flag = true;
        }

        //check new password
        if (flag && !$("#newPwd").val()) {
            $("#errNewPwd").text("Please fill out new password!");
            flag = false;
        }
        else {
            $("#errNewPwd").text("");
            flag = true;
        }

        //check confirm password
        if (flag && !$("#retypePwd").val()) {
            $("#errRetypePwd").text("Please retype password!");
            flag = false;
        }
        else if(!($("#retypePwd").val()===$("#newPwd").val())){
            $("#errRetypePwd").text("Password Don't Match!");
            flag = false;
        }
        else {
            $("#errRetypePwd").text("");
            flag = true;
        }

        if (flag) {
            this.submit();
        }
    });
  });