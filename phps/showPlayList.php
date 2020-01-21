<?php
try {
  require_once("./connectBooks.php");
  session_start();

  $sql = "select apl.plist_name,apl.list_pic,tsml.song_no,tsml.song_name,tsml.song_pic,tsml.song_addr,mem2.mem_name
from `member` mem  join myfavorite mf on (mem.mem_no = mf.mem_no) join allplaylist apl on (mf.mem_no=apl.mem_no) join singleplaylist spl on (apl.plist_no = spl.plist_no) join total_station_music_library tsml on (spl.song_no = tsml.song_no) join `member` mem2 on (mem2.mem_no=tsml.mem_no)
where mem.mem_no = :memNo and apl.plist_name = :plistName
group by tsml.song_no
order by tsml.song_no asc";

  $selectList = $pdo->prepare($sql);
  $selectList->bindValue(':plistName', $_GET['plistName']);
  $selectList->bindValue(':memNo', $_SESSION['mem_no']);
  $selectList->execute();
  if ($selectList->rowCount() == 0) {
    echo '[]';
  } else {
    $listRow = $selectList->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listRow);
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
}
