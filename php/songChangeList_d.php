<?php
try {
  require_once("./connectBooks.php");
  $sql = "delete from singleplaylist
  where plist_no=:plistNo and song_no=:songNo;";
  $modifyData = $pdo->prepare($sql);
  $modifyData->bindValue(':plistNo',  $_GET['plistNo']);
  $modifyData->bindValue(':songNo', $_GET['plistName']);
  $modifyData->execute();


  
  if ($modifyData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
