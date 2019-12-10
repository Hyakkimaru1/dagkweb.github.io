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
  $('#form-manage').on('submit', function(e){
    e.preventDefault();
    var flag = true;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Regular Expressions
    if (!$("#FullName").val()) {
        $("#errFullName").text("Name is empty!");
        flag = false;
    }
    else{
      $("#errFullName").text("");
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
    if (!$("#date-of-birth").val()) {
      $("#errDate").text("Date is empty!");
      flag = false;
    }
    else{
      $("#errDate").text("");
      flag = true;
    }
    if(flag){
      this.submit();
    }
  });
});

$(document).ready( function() {
  $('#falseinput').click(function(){
    $("#fileinput").click();
  });

  $('#fileinput').on('change',function() {
    alert(window.URL.createObjectURL($('#fileinput').files[0]));
    $('#avatar').attr('src', window.URL.createObjectURL($('#fileinput').files[0]));
  });
});

