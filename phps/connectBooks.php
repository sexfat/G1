<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";
$user = "root";
<<<<<<< HEAD
$password = "456123789";
=======
$password = "liltwind529";
>>>>>>> d3ad60abbc5ab4ccc6936ab746e7ed989dd07725
$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>