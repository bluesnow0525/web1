$(document).ready(function (e) {
    
    refresh();
    $("#send").click(function(){
        if($("#user").val() != "" && $("#pass").val() != "" && $("#email").val() != "" && $("#color").val() != "" && $("input:radio[name=gender]:checked").val()!=""){
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
                    
                    var u=0;
                    var m=0;
                    var uid="";
                    
                    for (var num = 0; num < output.length; num++){
                        
                        if(output[num][1]=="loguser"){
                            u=parseInt(output[num][2]);
                            uid+=output[num][2];
                            m=num;
                        }
                    }
                    for (var num = 0; num < output.length; num++){
                        if($("#user").val()==output[num][1] && $("#pass").val()==output[num][2] && $("#user").val()!=output[m][1]){
                            a=1;
                            $("#errtxt").text("account has been sign");
                        }
                    }
                    
                    if(a==0){
                        send(uid);
                        window.location.href="mainview.html";
                    }
                }
                
            });
            
        }
    });
});



function send(u){
    $.ajax({
        type: "POST",
        url: "changeuser.php",
        data: {
            id:u,
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
            
            
        }
    });
}

function refresh(){
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
}