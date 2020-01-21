<?php
try {
  require_once("./connectBooks.php");
  session_start();
  $sql = "insert into `allplaylist`(plist_no,mem_no,plist_name,list_pic)
  values (null,:mem_no,:plistName,'./img/library/list_pic_no.jpg');";

  $createData = $pdo->prepare($sql);
  $createData->bindValue(':mem_no', $_SESSION['mem_no']);
  $createData->bindValue(':plistName', $_POST['createListName']);
  $createData->execute();
  if ($createData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
