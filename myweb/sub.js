var stru="";
$(document).ready(function (e) {
    $(".v").hide();
    $.ajax({
        type: "POST",
        url: "readsession.php",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function (output2) {
            stru=output2;
        } 
    });
    $.ajax({
        type: "POST",
        url: "readmsg.php",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function (output) {
            output = $.parseJSON(output);
            console.log(output);
            
            var txt="hi ";
            
            for (var num = 0; num < output.length; num++){
                if(output[num][0]==stru){
                    txt+=output[num][1];
                }
            }
            
            $("#you").text(txt);

        }
    });
    $("#send").click(function(){
        $("#send").text("subscribed");
        $(".v").show();
    });
});