function validate(){
    var f_name = document.getElementById("txtFirstName").value;
    var l_name = document.getElementById("txtLastName").value;
    var addr = document.getElementById("txtAddr").value;
    var user = document.getElementById("txtUserName").value;
    var email = document.getElementById("txtEmail");
    var pwd1 = document.getElementById("password1").value;
    var pwd2 = document.getElementById("password2").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regular Expressions

    //check first name
    if(f_name == "")
    {
        document.getElementById("errFName").innerHTML = "Please fill out First name!";
        return false;
    }
    else
    {
        document.getElementById("errFName").innerHTML = "";
    }

    //check last name
    if(l_name == "")
    {
        document.getElementById("errLName").innerHTML = "Please fill out last name!";
        return false;
    }
    else
    {
        document.getElementById("errLName").innerHTML = "";
    }

    //check address
    if(addr == "")
    {
        document.getElementById("errAddr").innerHTML = "Please fill out your address!";
        return false;
    }
    else
    {
        document.getElementById("errAddr").innerHTML = "";
    }

    //check user name
    if(user == "")
    {
        document.getElementById("errUserName").innerHTML = "Please fill out user name!";
        return false;
    }
    else
    {
        document.getElementById("errUserName").innerHTML = "";
    }

    //check email
    if(email.value == "")
    {
        document.getElementById("errEmail").innerHTML = "Please fill out your email!";
        return false;
    }
    else if (!filter.test(email.value))
    {
        document.getElementById("errEmail").innerHTML = "Invalid email format!";
        return false;
    }
    else
    {
        document.getElementById("errEmail").innerHTML = "";
    }

    //check password
    if(pwd1=="")
    {
        document.getElementById("errPwd").innerHTML = "Please fill out password!";
        return false;
    }
    else
    {
        document.getElementById("errPwd").innerHTML = "";
    }

    //check confirm password
    if(pwd2=="")
    {
        document.getElementById("errCfpwd").innerHTML = "Please fill out password!";
        return false;
    }
    else if(pwd2 !=pwd1)
    {
        document.getElementById("errCfpwd").innerHTML = "Password Don't Match";
        return false;
    }
    else
    {
        document.getElementById("errCfpwd").innerHTML = "";
    }

    return get_action();
}

//check recaptcha
function get_action() 
{
    var v = grecaptcha.getResponse();
    if(v.length == 0)
    {
        document.getElementById('errCaptcha').innerHTML="You can't leave Captcha Code empty";
        return false;
    }
    else
    {
        document.getElementById('errCaptcha').innerHTML="";
        return true; 
    }
}