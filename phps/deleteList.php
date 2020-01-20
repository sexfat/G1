<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $sql = "delete from singleplaylist
  where plist_no=:plistNo";
    $delData = $pdo->prepare($sql);
    $delData->bindValue(':plistNo',  $_POST['plistNo']);
    $delData->execute();
    if ($delData->rowCount() >= 0) {

        $sql2 = "delete from allplaylist
    where allplaylist.plist_no=:plistNo";
        $delData2 = $pdo->prepare($sql2);
        $delData2->bindValue(':plistNo',  $_POST['plistNo']);
        $delData2->execute();
        if ($delData2->rowCount() > 0) {
            echo 'success';
        } else {
            echo 'fail';
        }
    } else {
        echo 'fail';
    }
} catch (PDOException $e) {
    echo '例外行號：', $e->getLine(), '<br>';
    echo '錯誤訊息：', $e->getMessage(), '<br>';
}
