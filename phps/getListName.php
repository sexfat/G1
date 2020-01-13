<?php
try {
  require_once("./connectBooks.php");
  $sql = "select plist_no,plist_name,list_pic
  from allplaylist apl join myfavorite mf using (mem_no)
  where apl.mem_no = 1
  group by plist_name
  order by plist_no asc;";

  $allList = $pdo->query($sql);

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
