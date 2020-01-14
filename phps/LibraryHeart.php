<?php
try {
  require_once("./connectBooks.php");
  session_start();
  if (isset($_SESSION['mem_no'])) {
    switch ($_POST['favorStatus']) {
      case 'red':
        $sql = "insert into myfavorite value (:memNo,:songNo);";
        $selectList = $pdo->prepare($sql);
        $selectList->bindValue(':memNo', $_SESSION['mem_no']);
        $selectList->bindValue(':songNo', $_POST['favorSong']);
        $selectList->execute();
        if ($selectList->rowCount() == 0) {
          echo 'Afail';
        } else {
          echo 'Asuccess';
        }
        break;

      case 'gray':
        $sql = "delete from `myfavorite` where mem_no=:memNo and song_no=:songNo ;";
        $selectList = $pdo->prepare($sql);
        $selectList->bindValue(':memNo', $_SESSION['mem_no']);
        $selectList->bindValue(':songNo', $_POST['favorSong']);
        $selectList->execute();
        if ($selectList->rowCount() == 0) {
          echo 'Dfail';
        } else {
          echo 'Dsuccess';
        }
        break;
    }
  }
} catch (PDOException $e) {
  echo "例外行號:", $e->getLine(), "<br>";
  echo "錯誤訊息:", $e->getMessage(), "<br>";
}
