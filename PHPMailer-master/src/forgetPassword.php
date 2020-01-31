<?php

use PHPMailer\PHPMailer\PDOException;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require('Exception.php');
require('PHPMailer.php');
require('SMTP.php');

function generateRandomString($length = 6)
{
    $characters = '0123456789abcde';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
};
try {
    require_once "../../phps/connectBooks.php";
    $searchEmail = $_POST["forpswlogin"];
    // $searchEmail ="soundwave@gmail.com";
    $checkEmail = "select * from `member` where mem_acct='{$searchEmail}';";
    $showEmail = $pdo->query($checkEmail);
    if ($memberRow = $showEmail->fetch(PDO::FETCH_ASSOC)) {
        $Randompsw = generateRandomString();
        $updatapsw = "update `member` set mem_psw='{$Randompsw}' where mem_acct='{$searchEmail}';";
        $runpsw = $pdo->exec($updatapsw);

        $mail = new PHPMailer(true);
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = 'dd104g1@gmail.com';
        $mail->Password = 'DD104g1aa';
        $mail->SMTPSecure = "ssl";
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        // $mail->SMTPDebug = 0;
        
        //Recipients
        $mail->setFrom('dd104g1@gmail.com', 'SOUNDWAVE');
        $mail->addAddress('dd104g1@gmail.com');
        $mail->charSet = 'utf-8';
        // Content
        $mail->Subject = 'SOUNDWAVE password comfirmation';
        $mail->Body =
            'Hello: ' . $memberRow["mem_name"] . '
             New password:' . $Randompsw . '
             Please use this new password log in again.';
        $mail->Send();
        // echo 123;

             //  if ($mail->Send()) {
            //     echo "已發送郵件";
            // }
    
        // } else {
        //     echo "查無此帳號";
        // }
    }

} catch (PDOException $msg) {
    echo "例外行號 : ", $msg->getLine(), "<br>";
    echo "例外原因 : ", $msg->getMessage(), "<br>";
}
?>