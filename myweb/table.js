var stru="";
$(document).ready(function (e) {
    ss();
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
            var table = "";
            var txt="hi ";
            for (var num = 0; num < output.length; num++) {
                if(output[num][1]!="loguser"){
                    table += "<tr><td>" + output[num][0] + "</td>";
                    table += "<td>" + output[num][1] + "</td>";
                    table += "<td>" + output[num][3] + "</td>";
                    table += "<td>" + output[num][4] + "</td>";
                    table += "<td>" + output[num][5] + "</td></tr>";
                }
                
            }
            for (var num = 0; num < output.length; num++){
                if(output[num][0]==stru){
                    txt+=output[num][1];
                }
            }
            
            $("#message_table").html(table);
            $("#you").text(txt);

        }
    });
    
});

function ss(){
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
}