<?php
session_start();

switch ($_GET['get']) {
  case "storemoney":
    try {
      require_once('./connect_dd104g1.php');
      $sql = "INSERT INTO `stored value record`(`store_no`, `mem_no`, `store_price`, `store_day`) 
          VALUES (null,{$_SESSION['mem_no']},{$_GET['store_price']},'{$_GET['store_day']}')";
      $add = $pdo->prepare($sql);
      $add->execute();

      $sql = "UPDATE `member` SET mem_point = mem_point + {$_GET['store_price']} WHERE mem_no = {$_SESSION['mem_no']}";
      $points = $pdo->prepare($sql);
      $points->execute();

      echo "Stored value successfully";
    } catch (PDOException $th) {
      echo $th->getMessage(), "<br>";
    }
    break;
  case "meminfos":
    try {
      require_once('./connect_dd104g1.php');
      $sql = "SELECT * FROM `member` WHERE mem_no = {$_SESSION['mem_no']} ";
      $mem = $pdo->prepare($sql);
      $mem->execute();
      $mems = $mem -> fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($mems);;
    } catch (PDOException $th) {
      echo $th->getMessage(), "<br>";
    }
    break;
}
?>