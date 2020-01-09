<?php
try {
  require_once("./connectBooks.php");
  $sql = "select `entries_name`,`vote_per`,`entries_song`,`entries_img` from `entries` where `activity_no`=2019";
  $allNowList = $pdo->query($sql);
  $nowListRow = $allNowList->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($nowListRow,true);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};

?>

