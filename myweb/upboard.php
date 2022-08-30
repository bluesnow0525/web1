<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");

    $user = $_POST['user'];
    $userid = $_POST['userid'];
    $title = $_POST['title'];
    $txt = $_POST['txt'];
    $touser = $_POST['touser'];
    $timestamp = date('Y-m-d H:i:s');
    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');

    $sql = "INSERT INTO `board`(`id`, `user`, `userid`, `touser`, `txt`, `title`, `time`) VALUES (0,
     '$user','$userid','$touser','$txt','$title','$timestamp')";
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>