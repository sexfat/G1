<?php
require_once("./connectBooks.php");
session_start();

try {
  $msg = $_POST['libraryMsg'];
  switch ($msg) {
    case 'del':
      $sql = "select *
      from singleplaylist 
      where song_no=:songNo and plist_no=:plistNo;";
      $selData = $pdo->prepare($sql);
      $selData->bindValue(':plistNo',  $_POST['lightPlistNoA']);
      $selData->bindValue(':songNo', $_POST['lightSongNo']);
      $selData->execute();

      if($selData->rowCount()==0){
        $sql = "delete from `singleplaylist`
        where plist_no=:plistNo and song_no=:songNo;";
        $delData = $pdo->prepare($sql);
        $delData->bindValue(':plistNo',  $_POST['lightPlistNo']);
        $delData->bindValue(':songNo', $_POST['lightSongNo']);
        $delData->execute();
  
        if ($delData->rowCount() > 0) {
          echo 'success';
        }
      }else{
        echo 'fail';
      }
      break;
      
    case 'add':
      $sql = "insert into singleplaylist
      values (:plistNo,:songNo);";
      $addData = $pdo->prepare($sql);
      $addData->bindValue(':plistNo',  $_POST['lightPlistNoA']);
      $addData->bindValue(':songNo', $_POST['lightSongNo']);
      $addData->execute();

      if ($addData->rowCount() > 0) {
        echo 'success';
      } else {
        echo 'fail';
      }
      break;
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
