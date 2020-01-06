<?php
try {
    require_once("./connectBooks.php");
    $sql = "update allplaylist
  set list_pic = :listPic
  where plist_no = :plistNo;";
    $modifyData = $pdo->prepare($sql);
    $modifyData->bindValue(':plistNo',  $_GET['plistNo']);
    $modifyData->bindValue(':listPic', $_GET['plistName']);
    $modifyData->execute();
    if ($modifyData->rowCount() > 0) {
        echo 'success';
    } else {
        echo 'fail';
    }
} catch (PDOException $e) {
    echo '例外行號：', $e->getLine(), '<br>';
    echo '錯誤訊息：', $e->getMessage(), '<br>';
}
