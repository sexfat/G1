<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $sql = "SELECT * FROM `myfavorite` where mem_no = {$_SESSION['mem_no']}";
    $myfavorite = $pdo->query($sql);
    $myfavoriteRow = $myfavorite->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($myfavoriteRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
