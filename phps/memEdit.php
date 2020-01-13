<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $mem_no = $_SESSION["mem_no"];
    if ($_POST["edit"] == 'name') {
        $sql = "update `member` set `mem_name` = :mem_name where `mem_no` = $mem_no";
        $member = $pdo->prepare($sql);
        $member->bindValue('mem_name', $_POST["mem_name"]);
    } else if ($_POST["edit"] == 'psw') {
        $sql = "update `member` set `mem_psw` = :mem_psw where `mem_no` = $mem_no";
        $member = $pdo->prepare($sql);
        $member->bindValue('mem_psw', $_POST["mem_psw"]);
    }
    $member->execute();
    echo "success";
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
