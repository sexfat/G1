<?php
try {
  require_once("./connectBooks.php");
  session_start();
  
  if (isset($_SESSION['mem_no'])) {
    $sql = "select apl.plist_name,apl.list_pic,tsml.song_no,tsml.song_name,tsml.song_pic,tsml.song_addr,mem.mem_name
    from allplaylist apl join singleplaylist spl using(plist_no) join total_station_music_library tsml using(song_no)  join myfavorite mf using(song_no) join `member` mem on (mem.mem_no)
    where mem.mem_no = :memNo and plist_name = :plistName
    order by tsml.song_no asc;";

    $selectList = $pdo->prepare($sql);
    $selectList->bindValue(':memNo', $_SESSION['mem_no']);
    $selectList->bindValue(':plistName', $_GET['plistName']);

    $selectList->execute();
    if ($selectList->rowCount() == 0) {
      echo '{}';
    } else {
      $listRow = $selectList->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($listRow);
    }
  } else {
    $sql = "select plist_name,list_pic,song_no,song_name,song_pic,song_addr,totaltime,mem.mem_name
    from allplaylist apl join singleplaylist spl using(plist_no) join total_station_music_library tsml using(song_no) join `member` mem on (mem.mem_no)
    order by tsml.song_no asc;";

    $selectList = $pdo->prepare($sql);
    $selectList->execute();
    if ($selectList->rowCount() == 0) {
      echo '{}';
    } else {
      $listRow = $selectList->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($listRow);
    }
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
}
