<?php
try {
  require_once("./connectBooks.php");
  $sql = "select `entries_name`,`entries_song`,`entries_img`,`mem_name`,`vote_per` 
  from `entries`,`MEMBER` 
  where `activity_no`=2018 and `MEMBER`.mem_no=entries.mem_no 
  order by `vote_per` desc;";
  $allNowList = $pdo->query($sql);
  $nowListRow = $allNowList->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($nowListRow,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};

?>