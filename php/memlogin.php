<?php
try {
    require_once("connectBooks.php");

    // $pdo = new PDO($dsn,$user,$password,$options);
    $sql = "select * from `member` where mem_acct =:mem_acct and mem_psw =:mem_psw";
    $memInsert = $pdo -> prepare($sql);
    $memInsert->bindValue('mem_acct',$_POST['mem_acct']);
    $memInsert->bindValue('mem_psw',$_POST['mem_psw']);
    $memInsert->execute();
    
    if( $memInsert->rowCount() != 0){
        $memRow = $memInsert->fetch(PDO::FETCH_ASSOC);
        session_start();
        $_SESSION["mem_no"] = $memRow["mem_no"];
        $_SESSION["mem_acct"] = $memRow["mem_acct"];
        $_SESSION["mem_psw"] = $memRow["mem_psw"];

        echo "Log in successly!";
    }else{
        echo "Account or password is wrong,please enter the right one";
    }
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>