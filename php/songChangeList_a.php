<?php
try {
  require_once("./connectBooks.php");
  $sql = "insert into singleplaylist
  values (:plistNo,:songNo);";
  $addData = $pdo->prepare($sql);
  $addData->bindValue(':plistNo',  $_POST['lightPlistNo']);
  $addData->bindValue(':songNo', $_POST['lightSongNo']);
  $addData->execute();

  if ($addData->rowCount() > 0) {
    echo 'success';
  } else {
    echo 'fail';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
