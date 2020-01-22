<?php 
 session_start();
  function saveImageFile($imageFile){
      if (!isset($imageFile)) {
          return null;
      }
      if (move_uploaded_file($imageFile['tmp_name'],'../img/uploadpic/'.$imageFile['name'])){
          return '../img/uploadpic/'.$imageFile['name'];
      };
      return null;
  }
  function saveMusicFile($file){
      if (!isset($file)) {
          return null;
      }
      if(move_uploaded_file($file['tmp_name'],'../music/'.$file['name'])){
          return '../music/'.$file['name'];
      };
      return null;
  }
  try {
    require_once("connectBooks.php");
     $memNo = $_SESSION["mem_no"];
     $img = saveImageFile($_FILES['song_pic']);
     if (!isset($img)) {
         die("{code: 0, message:'請先上載圖片。'}");
     }
     $file = saveMusicFile($_FILES['song_addr']);
     if (!isset($file)){
         die("{code: 0, message:'請先上載音樂檔案。'}");
     }
    $insertSql = "INSERT INTO `total_station_music_library`(`mem_no`,`song_name`,`song_date`,`song_idn`,`song_pic`,`cat_no`,`song_hashtag`,`song_addr`)".
                 "VALUES (:memNo, :songName, CURRENT_DATE(), :songIdn, :songPic, :catNo, :songHashTag, :songAddr)";
    $addSong = $pdo -> prepare($insertSql);
    $addSong -> bindValue(":memNo", $memNo);
    $addSong -> bindValue(":songName", $_POST["song_name"]);
    $addSong -> bindValue(":songIdn", $_POST["song_idn"]);
    $addSong -> bindValue(":songPic", $img);
    $addSong -> bindValue(":catNo", $_POST["cat_no"]);
    $addSong -> bindValue(":songHashTag", $_POST["song_hashtag"]);
    $addSong -> bindValue(":songAddr", $file);
    $addSong->execute();
    if ($addSong -> rowCount() == 0){
        die("{code: 0, message:'保存失敗。'}");
    }
    $queryMySongsSql = "select * from total_station_music_library where mem_no = :memNo order by song_date desc";
    $queryMySongs = $pdo -> prepare($queryMySongsSql);
    $queryMySongs -> bindValue(":memNo" , $memNo);
    $queryMySongs -> execute();
    $resultSet = $queryMySongs -> fetchAll();
    echo json_encode($resultSet);
  } catch (PDOException $up) {

	echo "例外行號 : ", $up->getLine(),"<br>";
	echo "例外原因 : ", $up->getMessage(),"<br>";		
  }
  ?>