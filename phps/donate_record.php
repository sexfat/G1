<?php
  try {
    //code...
    session_start();
    require_once('./connect_dd104g1.php');
    $sql = "SELECT * FROM `donate_record` where mem_no = {$_SESSION['mem_no']} order by donate_day desc" ;
    $all = $pdo -> prepare($sql);
    $all ->execute();
    $list = $all -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($list);
  } catch (PDOException $th) {
    echo $th -> getMessage(),"<br>";
  }
?>