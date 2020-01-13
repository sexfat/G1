<?php 
  try {
	require_once("connectBooks.php");
    $sql = "Insert into `total_station_music_library`(`song_no`,`song_name`,`song_date`)
            values(`song_no`=:song_no,`song_name`=:song_name,`song_date`=:song_date)";
    $songsadd = $pdo -> prepare($sql);
    // $songsadd->bindValue('song_pic',$_POST['song_pic']);
    $songsadd->bindValue('song_name',$_GET['song_name']);
    $songsadd->bindValue('song_no',11);
    $songsadd->bindValue('song_date',2020-01-12);
    $songsadd->execute();
    if( $songsadd->rowCount() != 0){
        $addRow = $songsadd->fetch(PDO::FETCH_ASSOC);
        // $songpic=$_POST["song_pic"];
        $songpic=$_GET["song_name"];
        echo "Successly";
    }else{
        echo "Failure";
    }
  } catch (PDOException $e) {
	echo "例外行號 : ", $e->getLine(),"<br>";
	echo "例外原因 : ", $e->getMessage(),"<br>";		
  }
  ?> 
</body>
</html>