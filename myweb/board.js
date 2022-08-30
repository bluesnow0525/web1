var stru="";
$(document).ready(function (e) {
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
    var uname="";
    var row="";
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
                    uname=output[num][1];
                }
            }           
            $("#you").text(txt);
        }
    });
    //refresh
    $.ajax({
        type: "POST",
        url: "readboard.php",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
        },
        success: function (output) {
            output = $.parseJSON(output);
            console.log(output);
            for (var num = 0; num < output.length; num++) {
                if(output[num][3]=="0"){
                    row+='<div class="row"><div class="d-flex justify-content-center">';
                    row+='<div class="mb-3"><div class="card" style="width: 18rem;"><div class="card-header">';
                    row+=output[num][5];                    
                    row+='</div><ul class="list-group list-group-flush"><li class="list-group-item"><span id="yourtxt">';
                    row+=output[num][4];
                    row+='</span></li><li class="list-group-item">by ';
                    row+=output[num][1];                        
                    row+='</li><li class="list-group-item">';
                    row+=output[num][6];
                    row+='</li>';
                    if(stru==output[num][2]){
                        row+='<li class="list-group-item"><div class="btn-group" role="group"><button type="button" data-num='+num +' class="edit">edit</button>';
                        row+='<button type="button" data-num='+num +' class="del">delete</button>';
                        row+='</div></li>';
                        row+='<li class="list-group-item edittxt" id="edittxt'+num +'"><input type="text" class="form-control" id="editcontent'+num+'">';
                        row+='<button type="submit" class="editsend" data-num='+num +' >Send to edit</button></li></ul>';
                    }            
                    row+='</ul><button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+num+'" aria-expanded="false" aria-controls="collapseExample">';
                    row+='reply';
                    row+='</button><div class="collapse" id="collapse'+num+'"><div class="card card-body">';
                    for (var num2 = 0; num2 < output.length; num2++){
                        if(output[num2][3]==output[num][2]){
                            row+='<div class="card-header">reply by ';  
                            row+=output[num2][1];                                            
                            row+=':</div><ul class="list-group list-group-flush"><li class="list-group-item">';
                            row+=output[num2][4];
                            row+='</li><li class="list-group-item">';
                            row+=output[num2][6];
                            row+='</li>';
                            if(stru==output[num2][2]){
                                row+='<li class="list-group-item"><div class="btn-group" role="group"><button type="button" data-num='+num2 +' class="edit">edit</button>';
                                row+='<button type="button" data-num='+num2 +' class="del">delete</button>';
                                row+='</div></li>';
                                row+='<li class="list-group-item edittxt" id="edittxt'+num2 +'"><input type="text" class="form-control" id="editcontent'+num2+'">';
                                row+='<button type="submit" class="editsend" data-num='+num2 +' >Send to edit</button></li></ul>';
                            }   
                            row+='</ul>';
                        }
                    }
                    row+='<ul class="list-group list-group-flush"><li class="list-group-item">';                                               
                    row+='<label for="recontent'+num+'" class="form-label">enter reply</label><input type="text" class="form-control" id="recontent'+num+'"></li>';
                    row+='<li class="list-group-item"><button type="submit" class="reply" data-num='+num +' >Send to reply</button></li></ul>';
                    
                    row+='</div></div></div></div></div></div>';
                }
            }
            $(".mes").html(row);
            $(".edittxt").hide();
            $(".reply").on( "click",function(){
                reply_num=$(this).attr("data-num");
                var tt='#recontent'+reply_num;
                console.log($(tt).val());
                $.ajax({
                    type: "POST",
                    url: "upboard.php",
                    data: {
                        userid: stru,
                        user:uname,
                        title: "0",
                        txt: $(tt).val(),
                        touser:output[reply_num][2] 
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    },
                    success: function(output2) {
                        console.log(output2);
                        location.reload();
                    }
                });
            });
            $(".del").on( "click",function(){
                del_num=$(this).attr("data-num");
                var delid=output[del_num][0];
                var deltouser=output[del_num][2];
                var istitle=output[del_num][3];
                console.log(delid);
                $.ajax({
                    type: "POST",
                    url: "delboard.php",
                    data: {
                        delid:delid,
                        deltouser:deltouser,
                        istitle:istitle
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    },
                    success: function(output3) {
                        console.log(output3);
                        location.reload();            
                    }
                });
            });
            $(".edit").on( "click",function(){
                edit_num=$(this).attr("data-num");
                var ee='#edittxt'+edit_num;
                $(ee).show();
                var text=$('#editcontent'+edit_num).val();
                var eid=output[edit_num][0];
                console.log(text);

            });
            $(".editsend").on( "click",function(){
                edit_num=$(this).attr("data-num");
                var text=$('#editcontent'+edit_num).val();
                var eid=output[edit_num][0];
                console.log(text);
                $.ajax({
                    type: "POST",
                    url: "changeboard.php",
                    data: {
                        eid:eid,
                        text:text
            
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    },
                    success: function(output) {
                        console.log(output);
                        location.reload();
                        
                    }
                });
            });
        }        
    });
    //show board
    $("#send").click(function(){
        $.ajax({
            type: "POST",
            url: "upboard.php",
            data: {
                userid: stru,
                user:uname,
                title: $("#newtitle").val(),
                txt: $("#newcontent").val(),
                touser: "0"
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            },
            success: function(output) {
                console.log(output);
                
            }
        });
    });
});