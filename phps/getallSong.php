<?php
try {
  require_once("./connectBooks.php");
  $sql = "select `song_no` 
  from `total_station_music_library`
  where `song_name` =:song_name;";
  $getSong = $pdo->prepare($sql);
  $getSong->bindValue(':song_name', $_GET['hrefNoName']);
  $getSong->execute();
  $getSongNo = $getSong->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($getSongNo,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
