<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");
    $id =$_POST['id'];
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $email = $_POST['email'];
    $color = $_POST['color'];
    $gender = $_POST['gender'];

    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');'
    $sql = "UPDATE `users` SET `pass` = '$pass', `email` = '$email', `user` = '$user', `gender` = '$gender', `color` = '$color' WHERE `id` = $id";
    
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>