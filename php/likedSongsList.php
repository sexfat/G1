<?php
try {
  require_once("./connectBooks.php");
  $sql = "select song_name,song_pic,song_addr,totaltime,mem.mem_name
  from `member` mem join total_station_music_library tsml using (mem_no) join myfavorite mf using (mem_no)
  where mem.mem_no = 1
  group by song_name;";

  $allList = $pdo->query($sql);
  $listRow = $allList->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($listRow);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
?>