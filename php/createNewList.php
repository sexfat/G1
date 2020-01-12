<?php
try {
  require_once("./connectBooks.php");
  $sql = "insert into `allplaylist`(plist_no,mem_no,plist_name,list_pic)
  values (null,1,:plistName,'./img/library/list_pic_no.jpg');";
  $createData = $pdo->prepare($sql);
  // $createData->bindValue(':mem_no', '1');
  $createData->bindValue(':plistName', $_POST['createListName']);
  $createData->execute();
  if ($createData->rowCount() > 0) {
    echo 'success';
  }
} catch (PDOException $e) {
  echo '例外行號：', $e->getLine(), '<br>';
  echo '錯誤訊息：', $e->getMessage(), '<br>';
}
