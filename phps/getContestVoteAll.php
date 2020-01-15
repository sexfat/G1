<?php
try {
  require_once("./connectBooks.php");
  $sql = "SELECT `activity_no`,sum(`vote_per`)`total_vote`
  FROM `entries`
  group by `activity_no`";
  $allNowList = $pdo->query($sql);
  $nowListRow = $allNowList->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($nowListRow,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};

?>