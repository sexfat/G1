<?php
  try {
    require_once("./connectBooks.php");
    session_start();
    $no = $_SESSION["mem_no"];

    $sql = "INSERT INTO `entries`( `activity_no`, `mem_no`, `entries_name`, `vote_per`, `entries_song`, `introduction`, `entries_img`, `donate_acount`, `fav_total`)
    VALUES (:activity_no,:mem_no,:entries_name,:vote_per,:entries_song,:introduction,:entries_img,:donate_acount,:fav_total);";
    $formList = $pdo->prepare($sql);
    $formList->bindValue(':entries_name',$_POST["Select_name"]);
    $formList->bindValue(':entries_song',$_POST["Select_song"]);
    $formList->bindValue(':introduction',$_POST["Select_information"]);
    $formList->bindValue(':entries_img',$_POST["Select_img"]);
    $formList->bindValue(':activity_no',2019);
    $formList->bindValue(':vote_per',0);
    $formList->bindValue(':donate_acount',0);
    $formList->bindValue(':fav_total',0);
    $formList->bindValue(':mem_no',$no);
    $formList->execute();

    echo $pdo->lastInsertId();

   
  } catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};


?>
