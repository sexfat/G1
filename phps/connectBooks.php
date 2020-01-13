<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";
<<<<<<< HEAD:phps/connectBooks.php
$user = "onezero";
$password = "acta228give331";
=======
$user = "root";
$password = "456123789";
>>>>>>> origin/yuling:php/connectBooks.php
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>