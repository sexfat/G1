<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `member`;";
    $allList = $pdo->query($sql);
    // $listRow = $allList->fetch(PDO::FETCH_ASSOC);
   
    if ($allList->rowCount() == 0) {
        echo "Account or password is ERROR, please<a href='login.html'>Log in again</a>";
    } else {   
         $memRow = $allList->fetch(PDO::FETCH_ASSOC);
        echo "Hello<br>";
    };
    //   echo json_encode($memRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>