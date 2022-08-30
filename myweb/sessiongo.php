<?php
	session_start();
    $pass = $_POST['pass'];
    
    $_SESSION['uid']=$pass;
    echo "success";
?>