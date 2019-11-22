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
    //is current password match with account's password saved in database? 

    //check new password
    if(New=="")
    {
        document.getElementById("errNewPwd").innerHTML = "Please fill out new password!";
        flag = false;
    }
    else if(New.length < 6)
    {
        document.getElementById("errNewPwd").innerHTML = "Password must have 6-8 characters.";
        flag = false;
    }
    else
    {
        document.getElementById("errNewPwd").innerHTML = "";
    }
    
    //check confirm password
    if(Retype=="")
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
    
    if(flag)
    {
        //change password in database

        //then
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your password has been changed successfully.',
            showConfirmButton: false,
            timer: 2000
        }).then(function() {
            window.location.href="home.html";
        });            
    }
}