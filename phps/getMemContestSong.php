<?php
try {
  require_once("./connectBooks.php");
  session_start();
  $no = $_SESSION["mem_no"];
  $sql = "select `song_name`,`song_pic`,`song_addr`,`song_idn`
  from `total_station_music_library`
  where `total_station_music_library`.`mem_no`= '$no';";
  $allNowList = $pdo->query($sql);
  $nowListRow = $allNowList->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($nowListRow,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};

?>