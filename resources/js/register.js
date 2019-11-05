function check(){
    var name = document.getElementById("txtName").value;
    var addr = document.getElementById("txtAddr").value;
    var email = document.getElementById("txtEmail");
    var pwd = document.getElementById("pwd").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regular Expressions
    if(name == "")
    {
        document.getElementById("errName").innerHTML = "Please fill out your name!";
        return false;
    }
    else
    {
        document.getElementById("errName").innerHTML = "";
    }

    if(addr == "")
    {
        document.getElementById("errAddr").innerHTML = "Please fill out your address!";
        return false;
    }
    else
    {
        document.getElementById("errAddr").innerHTML = "";
    }

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
    if(pwd=="")
    {
        document.getElementById("errPwd").innerHTML = "Please fill out password!";
        return false;
    }
    else if(pwd.length < 6)
    {
        document.getElementById("errPwd").innerHTML = "Password has 6-8 characters";
        return false;
    }
    else
    {
        document.getElementById("errPwd").innerHTML = "";
    }

    //kiểm tra trùng ở back-end
    //...


    alert("Register success!");
    return true;
}

//check recaptcha
function get_action(form) 
        {
            var v = grecaptcha.getResponse();
            if(v.length == 0)
            {
                document.getElementById('captcha').innerHTML="You can't leave Captcha Code empty";
                return false;
            }
            else
            {
                    document.getElementById('errcaptcha').innerHTML="Captcha completed";
                return true; 
            }
        }  