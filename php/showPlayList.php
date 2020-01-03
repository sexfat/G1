<?php
try {
  require_once("./connectBooks.php");
  $sql = "select plist_name,list_pic,song_name,song_pic,song_addr,totaltime,mem.mem_name
  from allplaylist apl join singleplaylist spl using(plist_no) join total_station_music_library tsml using(song_no) join `member` mem on (mem.mem_no)
  where mem.mem_no = 1;";

  $allList = $pdo->query($sql);
  $listRow = $allList->fetchAll(PDO::FETCH_ASSOC);
  // if($listRow->rowCount()==0){
  //   $listRow = "{}";
  // }
  // print_r($listRow);
  echo json_encode($listRow);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
