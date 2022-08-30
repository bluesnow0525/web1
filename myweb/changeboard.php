<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");
    $eid =$_POST['eid'];
    $text = $_POST['text'];
    $timestamp = date('Y-m-d H:i:s');
    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');'
    $sql = "UPDATE `board` SET `txt` = '$text',`time` = '$timestamp' WHERE `id` = $eid";
    
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>