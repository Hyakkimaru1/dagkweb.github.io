$(document).ready(function () {
    $('#form-feedback').on('submit', function (e) {
        e.preventDefault();
        var flag1 = true;
        var flag2 = true;
        var textareaVal = $("#message-text").val();

        //check radio input
        if ($('input[type=radio][name=point]:checked').length == 0) {
            $("#warning-p").show();
            flag1 = false;
        }
        else {
            $("#warning-p").hide();
            flag1 = true;
        }

        //check the value
        if (textareaVal == "") {
            $("#warning-fb").show(); // if textarea value is empty then show the warning text
            flag2 = false;
        }
        else {
            $("#warning-fb").hide(); // else textaer value is not empty then hide the warning text
            flag2 = true;
        }
        if (flag1 && flag2) {
            this.submit();
        }
    });
});


