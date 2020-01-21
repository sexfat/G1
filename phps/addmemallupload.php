<?php 
session_start();
try {
   require_once("connectBooks.php");
  //  $ret2=[];
   $sql = "SELECT mem_no, 
                  song_name, 
                  song_idn, 
                  song_pic as 'imageUrl', 
                  cat_no, song_hashtag, 
                  song_addr as 'musicUrl', 
                  song_no as 'id' 
            FROM `total_station_music_library` 
            WHERE mem_no = :mem_no";
   // $mem_no = '1';
   $addAllupload = $pdo->prepare($sql);
   $addAllupload->bindValue(':mem_no', $_POST['mem_no']);
   $addAllupload->execute();
   if ($addAllupload->rowCount() == 0) {
     echo '{}';
   } else {
     $AlluploadRow = $addAllupload->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($AlluploadRow);
   }
} catch (PDOException $up) {

  echo "例外行號 : ", $up->getLine(),"<br>";
  echo "例外原因 : ", $up->getMessage(),"<br>";		
}
?>