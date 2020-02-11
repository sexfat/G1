<?php
  try {
    //code...
    session_start();
    require_once('./connect_dd104g1.php');
  $sql = "SELECT * FROM `stored value record` where mem_no = {$_SESSION['mem_no']}";
    $all = $pdo -> prepare($sql);
    $all -> execute();
    $allinfos = $all -> fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($allinfos);
  } catch (PDOException $th) {
    echo $th -> getMessage();
  }
?>