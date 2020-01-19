<?php
try {
    require_once("connectBooks.php");
    
    $sql = "SELECT total_station_music_library.song_pic,
    total_station_music_library.song_name,total_station_music_library.cat_no,
    `member`.mem_name
    FROM (total_station_music_library
    INNER JOIN `member`
    ON total_station_music_library.mem_no = `member`.mem_no)
    INNER JOIN category
    ON total_station_music_library.cat_no = category.cat_no
    WHERE category.cat_no=2;";
    
    $collAlbumtrap = $pdo -> prepare($sql);
    $collAlbumtrap -> execute();
    $collAllAlbum2 = $collAlbumtrap->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($collAllAlbum2);

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
}
?>