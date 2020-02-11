<?php
try {
    require_once("connectBooks.php");
    $sql = "select * from `member` where mem_acct =:mem_acct and mem_psw =:mem_psw";
    $pdo = new PDO($dsn,$user,$password,$options);
    $memInsert = $pdo -> prepare($sql);
    // $memInsert->bindValue(':mem_acct','soundwave@gmail.com');
    // $memInsert->bindValue(':mem_psw','dd104g1dd104g1');
    $memInsert->bindValue(':mem_acct',$_POST['mem_acct']);
    $memInsert->bindValue(':mem_psw',$_POST['mem_psw']);
    $memInsert->execute();

    if( $memInsert->rowCount() != 0){
        echo "Account already be used,please enter other one!";
    }else{
        $sql1 = "insert into `member` (mem_acct,mem_psw) values (:mem_acct,:mem_psw);";
        $memInsert1 = $pdo -> prepare($sql1);
        $memInsert1->bindValue(':mem_acct',$_POST['mem_acct']);
        $memInsert1->bindValue(':mem_psw',$_POST['mem_psw']);
        $memInsert1->execute();
        $memNo = $pdo->lastInsertId();
        session_start();
        $_SESSION["mem_no"] = $memNo;
        $_SESSION["mem_acct"] = $_POST['mem_acct'];
        $_SESSION["mem_psw"] = $_POST['mem_psw'];
        
        echo "success";
    }
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>