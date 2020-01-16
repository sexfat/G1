<?php
try {
    require_once("./connectBooks.php");
    session_start();
    $no = $_SESSION["mem_no"];
    $sql = "select song_name  
    from `total_station_music_library`,`myfavorite`,`entries` 
    where `myfavorite`.`mem_no` = '$no' and `total_station_music_library`.`song_no`=`myfavorite`.`song_no` and `entries`.`entries_name`=`total_station_music_library`.`song_name` ";

    
    $mem_favorite = $pdo -> query($sql);
    $memHeart = $mem_favorite -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($memHeart);
   

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
