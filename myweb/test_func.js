$(document).ready(function(e) {
    
    
    $("#send").click(function() {
        if($("#user").val() != "" && $("#pass").val() != "" && $("#email").val() != "" && $("#color").val() != "" && $("input:radio[name=gender]:checked").val()!=""){
            refresh();
            $("p").text("1");
        }
    });
    
});

function refresh() {
    var a=0;
    $.ajax({
        type: "POST",
        url: "readmsg.php",
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            output = $.parseJSON(output);
            console.log(output);
            // var table = "";
            // for (var num = 0; num < output.length; num++) {
            //     table += "<tr><td>" + output[num][0] + "</td>";
            //     table += "<td>" + output[num][1] + "</td>";
            //     table += "<td>" + output[num][2] + "</td></tr>";
            // }

            // $("#message_table").html(table);
            for (var num = 0; num < output.length; num++){
                if($("#user").val()==output[num][1] && $("#pass").val()==output[num][2] ){
                    a=1;
                    $("#errtxt").text("account has been sign");
                }
            }
            if(a==0){
                send();
                window.location.href="login.html";
            }
        }
        
    });
    
}
function send(){
    $.ajax({
        type: "POST",
        url: "sendmsg.php",
        data: {
            user: $("#user").val(),
            pass: $("#pass").val(),
            email: $("#email").val(),
            color: $("#color").val(),
            gender:$("input:radio[name=gender]:checked").val()

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function(output) {
            console.log(output);
            
            window.location.href="login.html";
            // $("#msg").val("");
        }
    });
}