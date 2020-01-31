<?php
try {
  require_once("./connectBooks.php");
  $sql = "select `entries_no`,`entries_name`,`vote_per`,`entries_song`,`entries_img`,`mem_name` 
  from `entries`,`MEMBER` 
  where (`activity_no`=:activity_no) and `MEMBER`.mem_no=entries.mem_no";
  $allNowList = $pdo->prepare($sql);
  $allNowList->bindValue(':activity_no', $_GET['contestOldYear']);
  $allNowList->execute();
  $nowListRow = $allNowList->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($nowListRow,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
