<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $acct = $_SESSION["mem_acct"];
    $sql = "select * from `member` where mem_acct = '$acct'";
    $mem_info = $pdo -> query($sql);
    $memRow = $mem_info -> fetch(PDO::FETCH_ASSOC);
    echo json_encode($memRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
