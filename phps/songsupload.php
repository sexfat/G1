<?php 
  try {
  require_once("connectBooks.php");
  // $song_pic = $_FILES['song_pic']['name'];
  // $song_addr = $_FILES['song_addr']['name'];
    $sql = "INSERT INTO `total_station_music_library`(`mem_no`,`song_name`,`song_date`,`song_idn`,`song_pic`,`cat_no`,`song_hashtag`,`song_addr`) 
    VALUES (`mem_no`=:mem_no,'{$_POST["song_name"]}',CURRENT_DATE(),'{$_POST["song_idn"]}','./img/collection/{$_FILES["song_pic"]["name"]}','{$_POST["cat_no"]}','{$_POST["song_hashtag"]}','./music/{$_FILES["song_addr"]["name"]}')";
    $songsadd = $pdo -> prepare($sql);
    // $songsadd->bindValue(":song_name",$_GET["song_name"]);
    // $songsadd->bindValue(":song_no",11);
    // $sgadddate = date("Y-M-D",time());
    // $songsadd->bindValue(":song_date",$sgadddate);
    // $songsadd->bindValue(":song_idn",$_GET["song_idn"]);
    // $song_pic = ($_FILES['song_pic']['name']);
    // $songsadd->bindValue('song_pic',$_FILES["song_pic"]["name"]);
    $songsadd->bindValue(':mem_no',0);
    // $songsadd->bindValue(":donate_acount","0");
    // $songsadd->bindValue("cat_no",$_POST["cat_no"]);
    // $song_hashtag = $_GET["song_hashtag"];
    // $songsadd->bindValue("song_hashtag",$_POST["song_hashtag"]);
    // $songsadd->bindValue(":fav_total","0");
    // $song_addr = ($_FILES['song_addr']['name']);
    // $songsadd->bindValue('song_addr',$_FILES["song_addr"]["name"]);
    $songsadd->execute();
    if( $songsadd->rowCount() != 0){
        // $addRow = $songsadd->fetch(PDO::FETCH_ASSOC);
        // $addRow = $songsadd->fetchAll(PDO::FETCH_ASSOC);
        // $song_name=$_GET["song_name"];
        // $song_idn=$_GET["song_idn"];
        // $songpic=$_FILES["song_pic"]["name"];
        // $cat_no=$_POST["cat_no"];
        // $song_hashtag=$_POST["song_hashtag"];
        // $song_addr=$_FILES["song_addr"]["name"];
        if($_FILES['song_pic']['error']>0){
          exit("上傳失敗！");
        }
        move_uploaded_file($_FILES['song_pic']['tmp_name'],'../img/uploadpic/'.$_FILES['song_pic']['name']);
        // echo '<a href="file/'.$_FILES['song_pic']['name'].'">img/uploadpic/'.$_FILES['song_pic']['name'].'</a>';
        echo $_POST["song_name"];
        if($_FILES['song_addr']['error']>0){
          exit("上傳失敗！");
        }
        move_uploaded_file($_FILES['song_addr']['tmp_name'],'../music/'.$_FILES['song_addr']['name']);
        // echo '<a href="file/'.$_FILES['song_addr']['name'].'">music/'.$_FILES['song_addr']['name'].'</a>';
        // echo "Successly";
    }else{
        echo "Failure";
    }
  } catch (PDOException $up) {
	echo "例外行號 : ", $up->getLine(),"<br>";
	echo "例外原因 : ", $up->getMessage(),"<br>";		
  }
  ?> 