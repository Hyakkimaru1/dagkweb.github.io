function validate(){
    var f_name = document.getElementById("txtFirstName").value;
    var l_name = document.getElementById("txtLastName").value;
    var addr = document.getElementById("txtAddr").value;
    var email = document.getElementById("txtEmail");
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
        document.getElementById("errAddr").innerHTML = "Please fill out address!";
        return false;
    }
    else
    {
        document.getElementById("errAddr").innerHTML = "";
    }

    //check email
    if(email.value == "")
    {
        document.getElementById("errEmail").innerHTML = "Please fill out email!";
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

    

    return true;
}
