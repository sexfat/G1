<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $no = $_SESSION["mem_no"];
    $sql = "select entries_no
    from `vote`
    where mem_no=$no;";

    
    $mem_vote = $pdo -> query($sql);
    $mem_votes= $mem_vote -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($mem_votes);
   

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
