<?php
try {
    require_once("./connectBooks.php");
    $sql = "select * from `member`;";
    $allList = $pdo->query($sql);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>
<?php 
    $found = false;
    while( $memRow = $allList->fetch(PDO::FETCH_ASSOC)){
	    if( $memRow["mem_acct"] == $_POST["mem_acct"] && $memRow["mem_psw"]==$_POST["mem_psw"]){
        header("Location: http://localhost/G1/index.html"); 
		    $found = true;
		    break;
	    }
    }
    if( $found === false){
      header("Location: http://localhost/G1/login.html");
    }
?>