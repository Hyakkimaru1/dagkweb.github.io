function check()
{
    var flag = true;
    var Cur = document.getElementById("curPwd").value;
    var New = document.getElementById("newPwd").value;
    var Retype = document.getElementById("retypePwd").value;

    if(Cur=="")
    {
        document.getElementById("errCurPwd").innerHTML = "Please fill out current password!";
        flag = false;
    }
    else
    {
        document.getElementById("errCurPwd").innerHTML = "";
    }

    //check new password
    if(flag && New=="")
    {
        document.getElementById("errNewPwd").innerHTML = "Please fill out new password!";
        flag = false;
    }
    else
    {
        document.getElementById("errNewPwd").innerHTML = "";
    }
    
    //check confirm password
    if(flag && Retype=="")
    {
        document.getElementById("errRetypePwd").innerHTML = "Please retype password!"
        flag = false;
    }
    else if(New != Retype)
    {
        document.getElementById("errRetypePwd").innerHTML = "Password Don't Match!";
        flag = false;
    }
    else
    {
        document.getElementById("errRetypePwd").innerHTML = "";
    }
    return flag;
}

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
        if (!$("#newPwd").val()) {
            $("#errNewPwd").text("Please fill out new password!");
            flag = false;
        }
        else {
            $("#errNewPwd").text("");
            flag = true;
        }

        //check confirm password
        if (!$("#retypePwd").val()) {
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