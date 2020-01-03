

// function check(){
//     var name = $("#ten_DM_cha").val();
//     console.log($("#ten_DM_cha").val());
//     if(name == "") return false;
//     return true;
// }

$('#addC').click(function() {
    if(!check()){
        alert("Category has been added!");

    }
    else return false;

})
function myFunction() {
  alert("Category has been added!");
}

// $("#upgradeUser").click(function(){
//     alert("AAAAAAAAAAAAAAA");
// });



   function up(id){
        swal({
            title: "Are you sure you want to upgrade this user?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                $(document).ready(function() {
                  $("#"+id).attr("action",'/admin/users/patch');
                    $("#"+id).submit();
                });
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Cancelled upgrade!");
            }
          });
        }

        function down(id){
          swal({
              title: "Are you sure you want to degrade this user?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                  $(document).ready(function() {
                    $("#"+id).attr("action",'/admin/users/patch');
                      $("#"+id).submit();
                  });
                swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
              } else {
                swal("Cancelled degrade!");
              }
            });
          }
  


swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel plx!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm) {
    if (isConfirm) {
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
  }); 