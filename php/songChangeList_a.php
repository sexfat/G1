<?php
try {
  require_once("./connectBooks.php");
  $sql = "insert into singleplaylist
  values (:plistNo,:songNo);";
  $modifyData = $pdo->prepare($sql);
  $modifyData->bindValue(':plistNo',  $_GET['plistNo']);
  $modifyData->bindValue(':plistName', $_GET['plistName']);
  $modifyData->execute();


  
  if ($modifyData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
