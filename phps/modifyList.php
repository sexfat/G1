<?php
try {
  require_once("./connectBooks.php");
  $sql = "update allplaylist
  set plist_name = :plistName,list_pic=:listPic
  where plist_no = :plistNo;";
  $modifyData = $pdo->prepare($sql);
  $modifyData->bindValue(':plistNo',  $_POST['plistNo']);
  $modifyData->bindValue(':plistName', $_POST['plistName']);
  $modifyData->bindValue(':listPic', $_POST['listPic']);
  $modifyData->execute();
  if ($modifyData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
