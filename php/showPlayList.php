<?php
try {
  require_once("./connectBooks.php");
  $sql = "select * 
          from allplaylist ap join singleplaylist sp on(ap.plist_no = sp.plist_no)
          where ap.mem_no = 1;";
  $allList = $pdo->query($sql);
  $listRow = $allList->fetch(PDO::FETCH_ASSOC);

  json_encode($listRow);
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
