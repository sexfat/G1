<?php
$dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";

$user = "onezero";
$password = "acta228give331";

$options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
$pdo = new PDO($dsn, $user, $password, $options);
?>