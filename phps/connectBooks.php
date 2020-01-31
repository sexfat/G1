<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";
<<<<<<< HEAD
$user = "sandra";
$password = "st910018";
=======
$user = "root";
$password = "456123789";
>>>>>>> 0314f3b0329fceb310a2e97643c853bebef6d300
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>