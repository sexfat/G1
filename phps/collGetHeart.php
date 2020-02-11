<?php
  try {
    require_once('connectBooks.php');
    session_start();
    if($_SESSION["mem_no"]){
      $memno = $_SESSION["mem_no"];
      $sql = "select `myfavorite`.mem_no,`myfavorite`.song_no
      from `myfavorite`
      INNER JOIN total_station_music_library
      ON `myfavorite`.song_no=total_station_music_library.song_no
      where `myfavorite`.mem_no = '$memno'";
  
      $allHeart = $pdo -> prepare($sql);
      $allHeart ->execute();
      $heartChange = $allHeart -> fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($heartChange);
    }

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>