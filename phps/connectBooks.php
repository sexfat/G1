<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";
$user = "root";
<<<<<<< HEAD:phps/connectBooks.php
$password = "456123789";
=======
$password = "liltwind529";
>>>>>>> b100b7c12d490f9b9f6095c4bfee72298908bec7:php/connectBooks.php
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>