$(document).ready(function (e) {
    
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
            var u=0;
            var stru="";
            var txt="hi ";
            for (var num = 0; num < output.length; num++) {
                
                if(output[num][1]=="loguser"){
                    u=parseInt(output[num][2]);
                    stru+=output[num][2];
                }
            }
            for (var num = 0; num < output.length; num++){
                if(output[num][0]==stru){
                    txt+=output[num][1];
                }
            }
            
            $("#you").text(txt);

        }
    });
    
});