<?php
header('Access-Control-Allow-Origin: *');
$conn=mysqli_connect("localhost","root","","webuser");
mysqli_query($conn,"set names utf8");

# 檢查檔案是否上傳成功
 if ($_FILES['my_file']['error'] === UPLOAD_ERR_OK){
  echo '檔案名稱: ' . $_FILES['my_file']['name'] . '<br/>';
  echo '檔案類型: ' . $_FILES['my_file']['type'] . '<br/>';
  echo '檔案大小: ' . ($_FILES['my_file']['size'] / 1024) . ' KB<br/>';
  echo '暫存名稱: ' . $_FILES['my_file']['tmp_name'] . '<br/>';
 }
  # 檢查檔案是否已經存在
  date_default_timezone_set("Asia/Taipei"); 
  $uid=$_POST['userid'];
  $timestamp = date('Y-m-d H:i:s');
  $fsize=($_FILES['my_file']['size'] / 1024) . ' KB';
  $newid=$uid.'_';
  $fileName=$_FILES['my_file']['name'];//得到上傳檔案的名字
  $name=explode('.',$fileName);//將檔名以'.'分割得到字尾名,得到一個數組
  $newname=$newid.$fileName;
  if (file_exists('upfiles/' . $newname)){
    echo '檔案已存在。<br/>';
  } else {
    $file = $_FILES['my_file']['tmp_name'];
    $dest = 'upfiles/' . $newname;

    # 將檔案移至指定位置
    move_uploaded_file($file, $dest);
    $sql = "INSERT INTO `files`(`id`, `user_id`, `name`, `size`, `time`) VALUES (0,
     '$uid','$newname','$fsize','$timestamp')";
    if(!$send = mysqli_query($conn, $sql)) {
        echo mysqli_error($conn);
    } else {
        echo "success";
    }
  }

// } else {
//   echo '錯誤代碼：' . $_FILES['my_file']['error'] . '<br/>';
// }
?>