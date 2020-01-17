<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $no = $_SESSION["mem_no"];
    
    $sql = "INSERT INTO `vote`(entries_no, mem_no) VALUES (:entries_no,:mem_no);";
    $voteList = $pdo->prepare($sql);
    $voteList->bindValue(':entries_no',$_POST['entries_no']);
    $voteList->bindValue(':mem_no',$no);
    $voteList->execute();
    
    $sql1="update `entries`
    set `vote_per`= `vote_per`+1
    where `entries_no`=:entries_no;";
    $upVoteList = $pdo->prepare($sql1);
    $upVoteList->bindValue(':entries_no',$_POST['entries_no']);
    $upVoteList->execute();

   
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
?>
