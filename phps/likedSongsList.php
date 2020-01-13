<?php
try {
  require_once("./connectBooks.php");
  session_start();

  if ($_SESSION['mem_no']) {
    $sql = "select tsml.song_no,song_name,song_pic,song_addr,totaltime,mem.mem_name
    from `member` mem join total_station_music_library tsml using (mem_no) join myfavorite mf using (song_no)
    where mem.mem_no = :mem_no
    group by song_no
    order by mf.song_no asc;";

    $allList = $pdo->prepare($sql);
    $allList->bindValue(":memNo", $_SESSION['mem_no']);
    $allList->execute();
    if ($allList->rowCount() == 0) {
      echo '{}';
    } else {
      $listRow = $allList->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($listRow);
    }
  } else {
    echo '{}';
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
