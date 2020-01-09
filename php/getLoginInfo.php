<?php
session_start();
if (isset($_SESSION["mem_acct"])) {
    $memRow = array(
        "mem_no" => $_SESSION["mem_no"],
        "mem_acct" => $_SESSION["mem_acct"],
        "mem_psw" => $_SESSION["mem_psw"],
    );
    
    echo json_encode($memRow);
} else {
    echo "{}";
}
