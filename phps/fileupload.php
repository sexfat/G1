<?php
ignore_user_abort(true);
set_time_limit(0);
  switch ( $_FILES['song_addr']['error'] ){
    case UPLOAD_ERR_OK: 
      $dir = "./music";
        if( file_exists($dir) == false){
          mkdir($dir); 
      $from = $_FILES['song_addr']['tmp_name'];
      $to = "$dir/".$_FILES['song_addr']['name'];
      if(copy( $from, $to)){
        echo "上傳成功 <br>";
      }else{
        echo "上傳失敗 <br>";
      }
      break;
    case UPLOAD_ERR_INI_SIZE:
      echo "檔案太大, 不得超過", ini_get("song_addr_max_filesize"),  "<br>";
      break;
    case UPLOAD_ERR_FORM_SIZE:
      echo "檔案太大, 不得超過", $_POST["MAX_FILE_SIZE"],  "<br>";
      break;
    case UPLOAD_ERR_PARTIAL:
    echo "上傳過程發生錯誤, 請重送<br>";
      break;
    case UPLOAD_ERR_NO_FILE:
      echo "您没選檔案<br>";
      break;
    default:
      echo "['error']: " , $_FILES['song_addr']['error'] , "<br>"; 	
  }
?>