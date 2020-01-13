<?php
try {
  require_once("./connectBooks.php");
  $sql = "select plist_name,list_pic,song_no,song_name,song_pic,song_addr,totaltime,mem.mem_name
  from allplaylist apl join singleplaylist spl using(plist_no) join total_station_music_library tsml using(song_no) join `member` mem on (mem.mem_no)
  where mem.mem_no = 1 and plist_name = :plistName
  order by tsml.song_no asc;";
  // $mem_no = '1';
  $selectList = $pdo->prepare($sql);
  $selectList->bindValue(':plistName', $_GET['plistName']);
  // $selectList->bindValue(':mem_no', $mem_no);
  $selectList->execute();
  if ($selectList->rowCount() == 0) {
    echo '{}';
  } else {
    $listRow = $selectList->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listRow);
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
}
