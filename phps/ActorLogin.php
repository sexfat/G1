<?php
try {
    require_once("connectBooks.php");

    $pdo = new PDO($dsn,$user,$password,$options);
    $sql = " select * from `actor` where act_account =:actAcc and act_psw =:actPsw";
    $actInsert = $pdo -> prepare($sql);
    $actInsert->bindValue(':actAcc',$_POST['actAcc']);
    $actInsert->bindValue(':actPsw',$_POST['actPsw']);
    $actInsert->execute();
    
    if( $actInsert->rowCount() != 0){
        $actRow = $actInsert->fetch(PDO::FETCH_ASSOC);
        session_start();
        $_SESSION["act_no"] = $actRow["act_no"];
        $_SESSION["act_account"] = $actRow["act_account"];
        $_SESSION["act_psw"] = $actRow["act_psw"];
        echo "Login successly!";
    }else{
        echo "Account or password is wrong,please enter the right one";
    }
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>
