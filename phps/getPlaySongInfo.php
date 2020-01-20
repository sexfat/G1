<?php
try {
    require_once("./connectBooks.php");
    $sql = "SELECT `music`.`song_no`, `song_name`, `song_pic`, `song_addr`, `mem`.`mem_name` FROM `total_station_music_library` as music, `member` as mem where music.mem_no = mem.mem_no and song_no = :song_no";
    $song_info = $pdo->prepare($sql);
    $song_info->bindValue('song_no', $_REQUEST["song_no"]);
    $song_info->execute();

    $songRow = $song_info->fetch(PDO::FETCH_ASSOC);
    echo json_encode($songRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
