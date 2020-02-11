<?php
  $dsn = "mysql:host=localhost;port=3306;dbname=dd104g1;charset=utf8";
  $user = "dd104g1";
  $password = "dd104g1";
  $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
  $pdo = new PDO( $dsn, $user, $password, $options);
?>