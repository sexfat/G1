<?php 
  try {
	require_once("connectBooks.php");
    $sql = "INSERT INTO `total_station_music_library`(`mem_no`,`song_name`,`song_date`,`song_idn`,`song_pic`,`cat_no`,`song_hashtag`,`song_addr`) 
    VALUES (`mem_no`=:mem_no,'$_GET[song_name]',CURRENT_DATE(),'$_GET[song_idn]','$_GET[song_pic]','$_GET[cat_no]','$_GET[song_hashtag]','./music/$_GET[song_addr]')";
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