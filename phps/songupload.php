<?php 
  try {
	require_once("connectBooks.php");
    $sql = "INSERT INTO `total_station_music_library`(`mem_no`,`song_name`,`song_date`,`song_idn`,`song_pic`,`cat_no`,`song_hashtag`,`song_addr`) 
    VALUES (`mem_no`=:mem_no,'$_POST[song_name]',CURRENT_DATE(),'$_POST[song_idn]','$_POST[song_pic]','$_POST[cat_no]','$_POST[song_hashtag]','./music/$_POST[song_addr]')";
    $songsadd = $pdo -> prepare($sql);
    // $songsadd->bindValue(":song_name",$_GET["song_name"]);
    // $songsadd->bindValue(":song_no",11);
    // $sgadddate = date("Y-M-D",time());
    // $songsadd->bindValue(":song_date",$sgadddate);
    // $songsadd->bindValue(":song_idn",$_GET["song_idn"]);
    // $songsadd->bindValue(":song_pic",$_GET["song_pic"]);
    $songsadd->bindValue(':mem_no',0);
    // $songsadd->bindValue(":donate_acount","0");
    // $songsadd->bindValue(":cat_no",0);
    // $song_hashtag = $_GET["song_hashtag"];
    // $songsadd->bindValue(":song_hashtag",$_GET['song_hashtag']);
    // $songsadd->bindValue(":fav_total","0");
    // $songsadd->bindValue(":song_addr",$_GET["song_addr"]);
    $songsadd->execute();
    if( $songsadd->rowCount() != 0){
        // $addRow = $songsadd->fetch(PDO::FETCH_ASSOC);
        // $addRow = $songsadd->fetchAll(PDO::FETCH_ASSOC);
        // $song_name=$_GET["song_name"];
        // $song_idn=$_GET["song_idn"];
        // $songpic=$_GET["song_pic"];
        // $cat_no=$_GET["cat_no"];
        // $song_hashtag=$_GET["song_hashtag"];
        // $song_addr=$_GET["song_addr"];
        echo "Successly";
    }else{
        echo "Failure";
    }
  } catch (PDOException $up) {
	echo "例外行號 : ", $up->getLine(),"<br>";
	echo "例外原因 : ", $up->getMessage(),"<br>";		
  }
  ?>
  <?php
  $type=$_FILES['song_addr']['type'];
  $size=$_FILES['song_addr']['size'];
  $name=$_FILES['song_addr']['name'];
  $tmp_name=$_FILES['song_addr']['tmp_name'];
//   switch ( $_FILES['song_addr']['error'] ){
//     case UPLOAD_ERR_OK: 
//       $dir = "./music";
//         if( file_exists($dir) == false){
//           mkdir($dir); 
//       $from = $_FILES['song_addr']['tmp_name'];
//       $to = "$dir/".$_FILES['song_addr']['name'];
//       if(copy( $from, $to)){
        
//         echo "上傳成功 <br>";
//       }else{
//         echo "上傳失敗 <br>";
//       }
//       break;
//     case UPLOAD_ERR_INI_SIZE:
//       echo "檔案太大, 不得超過", ini_get("song_addr_max_filesize"),  "<br>";
//       break;
//     case UPLOAD_ERR_FORM_SIZE:
//       echo "檔案太大, 不得超過", $_POST["MAX_FILE_SIZE"],  "<br>";
//       break;
//     case UPLOAD_ERR_PARTIAL:
//     echo "上傳過程發生錯誤, 請重送<br>";
//       break;
//     case UPLOAD_ERR_NO_FILE:
//       echo "您没選檔案<br>";
//       break;
//     default:
//       echo "['error']: " , $_FILES['song_addr']['error'] , "<br>"; 	
//   }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
      echo "檔案類型:".$type."</br>";
      echo "檔案大小:".$size."</br>";
      echo "檔案名稱:".$name."</br>";
      echo "暫存名稱:".$tmp_name."</br>";
    ?>
</body>
</html>