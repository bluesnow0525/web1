<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");
    $delid = $_POST['delid'];
    $deltouser = $_POST['deltouser'];
    $istitle = $_POST['istitle'];
    
    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');
    $sql = "DELETE FROM `board` WHERE `id` = '$delid'";
    
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
    if($istitle=="0"){
        $sql = "DELETE FROM `board` WHERE `touser` = '$deltouser'";
        
        if(!$send = mysqli_query($conn, $sql)) {
            echo mysqli_error($conn);
        } else {
            echo "success";
        }
    }
?>