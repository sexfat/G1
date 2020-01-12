<?php 
  try {
	require_once("connectBooks.php");
	$sql = "insert into dd104g1(song_pic,song_name,song_addr,cat_no,song_idn)";
    $songsadd = $pdo -> prepare($sql);
    $songsadd->bindValue('song_pic',$_POST['song_pic']);
    $songsadd->bindValue('song_name',$_POST['song_name']);
    $songsadd->execute();
    if( $songsadd->rowCount() != 0){
        $addRow = $songsadd->fetch(PDO::FETCH_ASSOC);
        $songpic=$_POST["song_pic"];
        $songpic=$_POST["song_name"];
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