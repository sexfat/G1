<?php 
 session_start();
  function saveImageFile($imageFile){
      if (!isset($imageFile)) {
          return null;
      }
      if (move_uploaded_file($imageFile['tmp_name'],'../img/uploadpic/'.$imageFile['name'])){
          return '/img/uploadpic/'.$imageFile['name'];
      };
      return null;
  }
  function saveMusicFile($file){
      if (!isset($file)) {
          return null;
      }
      if(move_uploaded_file($file['tmp_name'],'../music/'.$file['name'])){
          return '/music/'.$file['name'];
      };
      return null;
  }
  try {
    require_once("connectBooks.php");
    // $addno = $_SESSION["mem_no"];
     $img = saveImageFile($_FILES['song_pic']);
     if (!isset($img)) {
         die("{code: 0, message:'請先上載圖片。'}");
     }
     $ret = [];
    //  $retjson = [];
     $file = saveMusicFile($_FILES['song_addr']);
     if (!isset($file)){
         die("{code: 0, message:'請先上載音樂檔案。'}");
     }
    $insertSql = "INSERT INTO `total_station_music_library`(`mem_no`,`song_name`,`song_date`,`song_idn`,`song_pic`,`cat_no`,`song_hashtag`,`song_addr`)".
                 "VALUES (:memNo, :songName, CURRENT_DATE(), :songIdn, :songPic, :catNo, :songHashTag, :songAddr)";
    $addSong = $pdo -> prepare($insertSql);
    $addSong -> bindValue(":memNo", ($ret["mem_no"] = $_SESSION["mem_no"]));
    $addSong -> bindValue(":songName", ($ret["song_name"] = $_POST["song_name"]));
    $addSong -> bindValue(":songIdn", ($ret["song_idn"] = $_POST["song_idn"]));
    $addSong -> bindValue(":songPic", ($ret["imageUrl"] = $img));
    $addSong -> bindValue(":catNo", ($ret["cat_no"] = $_POST["cat_no"]));
    $addSong -> bindValue(":songHashTag", ($ret["song_hashtag"] = $_POST["song_hashtag"]));
    $addSong -> bindValue(":songAddr", ($ret["musicUrl"] = $file));
    $addSong->execute();
    if ($addSong -> rowCount() == 0){
        die("{code: 0, message:'保存失敗。'}");
        // echo $_POST["song_name"];
    }
    // 獲取最後插入一條數據的，僅僅本次插入數據
    $getIdSQL = "select last_insert_id() as id";
    $dbQuery = $pdo ->query($getIdSQL);
    $result = $dbQuery -> fetchAll();
    $ret["id"] = $result[0]["id"];

    $getIdSQL2 = "select last_insert_id() as `cat_no`";
    $dbQuery2 = $pdo ->query($getIdSQL2);
    $result = $dbQuery2 -> fetchAll();
    // $ret["cat_no"] = $result{$_POST["cat_no"]};

    $getIdSQL3 = "select last_insert_id() as `song_hashtag`";
    $dbQuery3 = $pdo ->query($getIdSQL3);
    $result = $dbQuery3 -> fetchAll();
    // $ret["song_hashtag"] = $result[$ret["song_hashtag"]];

    $getIdSQL4 = "select last_insert_id() as `song_idn`";
    $dbQuery4 = $pdo ->query($getIdSQL4);
    $result = $dbQuery4 -> fetchAll();
    $ret["song_idn"] = $result[0]["song_idn"];

    echo json_encode($ret);
    // echo json_decode($retjson);
  } catch (PDOException $up) {

	echo "例外行號 : ", $up->getLine(),"<br>";
	echo "例外原因 : ", $up->getMessage(),"<br>";		
  }
  ?>