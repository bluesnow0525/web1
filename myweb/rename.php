<?php
	header('Access-Control-Allow-Origin: *');
	$conn=mysqli_connect("localhost","root","","webuser");
	mysqli_query($conn,"set names utf8");
    $new =$_POST['newname'];
    $old = $_POST['oldname'];
    $id=$_POST['id'];

    $newd='upfiles/'.$new;
    $oldd='upfiles/'.$old;
    // date_default_timezone_set("Asia/Taipei"); 
    // $timestamp = date('Y-m-d H:i:s');'
    $sql = "UPDATE `files` SET `name` = '$new' WHERE `id` = $id";
    rename($oldd,$newd);
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
?>