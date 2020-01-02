//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-pf");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

$(document).ready(function(){
  $(".alert").fadeTo(3000,0).slideUp(500, function () {
    $(this).remove();
  });
  $('#form-manage').on('submit', function(e){
    e.preventDefault();
    var flag = true;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regular Expressions
    if (!$("#firstname").val()) {
        $("#errFirstName").text("First name is empty!");
        flag = false;
    }
    else{
      $("#errFirstName").text("");
      flag = true;
    }

    if (!$("#lastname").val()) {
      $("#errLastName").text("Last name is empty!");
      flag = false;
  }
  else{
    $("#errLastName").text("");
    flag = true;
  }
    
    if (!$("#Addr").val()) {
      $("#errAddr").text("Address is empty!");
      flag = false;
    }
    else{
      $("#errAddr").text("");
      flag = true;
    }

    if (!$("#Email").val()) {
      $("#errEmail").text("Email is empty!");
      flag = false;
      
    }
    else if(!filter.test($("#Email").val())){
      $("#errEmail").text("Invalid Email format!");
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