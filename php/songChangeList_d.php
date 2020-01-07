<?php
try {
  require_once("./connectBooks.php");
  $sql = "delete from singleplaylist
  where plist_no=:plistNo and song_no=:songNo;";
  $delData = $pdo->prepare($sql);
  $delData->bindValue(':plistNo',  $_POST['lightPlistNo']);
  $delData->bindValue(':songNo', $_POST['lightSongNo']);
  $delData->execute();


  
  if ($delData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
