<?php
  try {
    require_once('./connect_dd104g1.php');
    $sql = "INSERT INTO `stored value record`(`store_no`, `mem_no`, `store_price`, `store_day`) VALUES (null,{$_GET['mem_no']},{$_GET['store_price']},'{$_GET['store_day']}')";
    $add = $pdo -> prepare($sql);
    $add -> execute();
    echo "Stored value successfully";
  } catch (PDOException $th) {
    echo $th -> getMessage(),"<br>";
  }
?>