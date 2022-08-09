<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");

    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $email = $_POST['email'];
    $color = $_POST['color'];
    $gender = $_POST['gender'];

    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');

    $sql = "INSERT INTO `users`(`id`, `user`, `pass`, `email`, `color`, `gender`) VALUES (0,
     '$user','$pass','$email','$color','$gender')";
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>