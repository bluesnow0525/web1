<?php
header('Access-Control-Allow-Origin: *');
$conn=mysqli_connect("localhost","root","","webuser");
mysqli_query($conn,"set names utf8");

    $fname=$_POST['fname'];
  
    $dest = 'upfiles/' . $fname;

    # 將檔案移至指定位置
    unlink($dest);
    $sql = "DELETE FROM `files` WHERE `name` = '$fname'";
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
  

// } else {
//   echo '錯誤代碼：' . $_FILES['my_file']['error'] . '<br/>';
// }
?>