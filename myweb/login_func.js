$(document).ready(function(e) {
    
    loger();
    $("#send").click(function() {
        if($("#user").val() != "" && $("#pass").val() != ""){
            $.ajax({
                type: "POST",
                url: "readmsg.php",
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                },
                success: function(output) {
                    output = $.parseJSON(output);
                    // console.log(output);
                    // var table = "";
                    // for (var num = 0; num < output.length; num++) {
                    //     table += "<tr><td>" + output[num][0] + "</td>";
                    //     table += "<td>" + output[num][1] + "</td>";
                    //     table += "<td>" + output[num][2] + "</td></tr>";
                    // }
                    
                    // $("#message_table").html(table);
                    
                    for (var num = 0; num < output.length; num++){
                        if($("#user").val()==output[num][1] && $("#pass").val()==output[num][2]){
                            $.ajax({
                                type: "POST",
                                url: "sendmsg.php",
                                data: {
                                    user: "loguser",
                                    pass: output[num][0],
                        
                                },
                                error: function(xhr, ajaxOptions, thrownError) {
                                    console.log(xhr.status);
                                    console.log(thrownError);
                                },
                                success: function(output) {
                                    console.log(output);
                                    
                                }
                            });
                            window.location.href="mainview.html";
                        }
                    }
                    
                }
            });
        }
    });
});

function loger(){

    $.ajax({
        type: "POST",
        url: "deldata.php",
        data: {
            user: "loguser",
            
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            console.log(output);
                        
        }
    });
}