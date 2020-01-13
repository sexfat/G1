<?php
try {
  require_once("./connectBooks.php");
  session_start();
  
    $sql = "inset into";

    $selectList = $pdo->prepare($sql);
    $selectList->bindValue(':memNo', $_SESSION['mem_no']);
    $selectList->bindValue(':songNo', $_POST['song_no']);

    $selectList->execute();
    if ($selectList->rowCount() == 0) {
      echo '{}';
    } else {
      $listRow = $selectList->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($listRow);
    }

} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
}
