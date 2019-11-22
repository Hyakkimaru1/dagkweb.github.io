function check(){
    var name = document.getElementById("txtName").value;
    var addr = document.getElementById("txtAddr").value;
    var email = document.getElementById("txtEmail");
    var pwd1 = document.getElementById("password1").value;
    var pwd2 = document.getElementById("password2").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regular Expressions

    //check name
    if(name == "")
    {
        document.getElementById("errName").innerHTML = "Please fill out your name!";
        return false;
    }
    else
    {
        document.getElementById("errName").innerHTML = "";
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
    else if(pwd1.length < 6)
    {
        document.getElementById("errPwd").innerHTML = "Password has 6-8 characters";
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
        document.getElementById('errCaptcha').innerHTML="Captcha completed";
        return true; 
    }
}  