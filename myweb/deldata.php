<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");
    $user = $_POST['user'];
    
    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');
    $sql = "DELETE FROM `users` WHERE `user` = 'loguser'";
    
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>