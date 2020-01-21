<?php
try {
  require_once("./connectBooks.php");
  session_start();
  $sql = "select apl.plist_no,apl.plist_name,apl.list_pic
  from allplaylist apl join myfavorite mf on (apl.mem_no=mf.mem_no)
  where apl.mem_no = :memNo
  group by apl.plist_name
  order by apl.plist_no asc;";
  

  $allList = $pdo->prepare($sql);
  $allList -> bindValue(':memNo',$_SESSION['mem_no']);
  $allList->execute();

  if ($allList->rowCount() == 0) {
    echo '{}';
  } else {
    $listRow = $allList->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($listRow);
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
};
