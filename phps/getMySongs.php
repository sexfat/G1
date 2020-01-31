<?php
session_start();
require_once("connectBooks.php");
$memNo = $_SESSION["mem_no"];
// 沒登進
if (!isset($memNo)){
    echo  "[]";
}
$queryMySongsSql = "select * from total_station_music_library where mem_no = :memNo order by song_date desc";
$queryMySongs = $pdo -> prepare($queryMySongsSql);
$queryMySongs -> bindValue(":memNo" , $memNo);
$queryMySongs -> execute();
$resultSet = $queryMySongs -> fetchAll();
echo json_encode($resultSet);