<?php
try {
    require_once("connectBooks.php");
    
    $sql = "SELECT `song_pic`,`song_name`,`category`.cat_no,`fav_total`,`member`.mem_name,`member`.mem_no,total_station_music_library.song_no
    FROM (total_station_music_library
    INNER JOIN `member`
    ON `total_station_music_library`.`mem_no` = `member`.mem_no)
    INNER JOIN category
    ON `total_station_music_library`.`cat_no` = `category`.`cat_no`
    order by `fav_total` DESC;";
    
    $collAlbumfav = $pdo -> prepare($sql);
    $collAlbumfav -> execute();
    $collAllAlbum1 = $collAlbumfav->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($collAllAlbum1);

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>