$(document).ready(function (e) {
    refresh();
    
    $("#inputf").change(function(){
        var txt = $('#inputf').get(0).files[0].name;
        console.log(txt);
    });
    $("#sendf").click(function(){
        var uid="";

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
                var stru="";
                for (var num = 0; num < output.length; num++) {
                    if(output[num][1]=="loguser"){
                        stru+=output[num][2];
                    }
                }
                uid+=stru;
                var files = $('#inputf').prop('files');
                var data =new FormData();
                data.append('my_file',files[0]);
                data.append('userid',uid);
                $.ajax({
                    type: "POST",
                    url: "upfile.php",
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                    },
                    success: function (output) {
                        //output = $.parseJSON(output);
                        console.log(output)
                        location.reload();
                    }
                });
            }
        });
        
    });
});

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
            var table = "";
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
            $.ajax({
                type: "POST",
                url: "readfile.php",
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                },
                success: function (output2) {
                    output2 = $.parseJSON(output2);
                    console.log(output2);
                    for (var num = 0; num < output2.length; num++) {
                        if(output2[num][1]==stru){
                            table += "<tr><td>" + output2[num][2] + "</td>";
                            table += "<td>" + output2[num][3] + "</td>";
                            table += "<td>" + output2[num][4] + "</td>";
                            table += '<td><div class="btn-group" role="group"><button type="button" id="edit" data-num='+num +' class="btn btn-outline-primary">edit</button>';
                            table += '<a href="'+'upfiles/'+output2[num][2]+'"download="'+output2[num][2]+ '"type="button" id="download" data-num='+num +'class="btn btn-outline-primary">download</a>';
                            table += '<button type="button" id="del" data-num='+num +' class="btn btn-outline-primary">delete</button></div></td></tr>';
                            
                        }
                    }
                    $("#message_table").html(table);
                    $("#you").text(txt);

                    $("#edit").click(function(){
                        cfile_num=$(this).attr("data-num");
                        $.ajax({
                            type: "POST",
                            url: "rename.php",
                            data: {
                                oldname:output2[cfile_num][2],
                                newname: $("#rename").val(),
                                id:output2[cfile_num][0]
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
                    $("#del").click(function(){
                        
                        cfile_num=$(this).attr("data-num");
                        
                        $.ajax({
                            type: "POST",
                            url: "delfile.php",
                            data: {
                                fname: output2[cfile_num][2],
                                
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

                }
            });
            
        }
    });
}
