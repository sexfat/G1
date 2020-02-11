<?php
try {
    require_once("./connectBooks.php");
    $sql = "SELECT music.song_no, song_name, song_idn, song_pic, mem.mem_name FROM `total_station_music_library` as music, `member` as mem where music.mem_no = mem.mem_no and (music.song_name = :song_name or mem.mem_name = :mem_name)";
    $search_result = $pdo->prepare($sql);
    $search_result->bindValue('song_name', $_REQUEST["search_keyword"]);
    $search_result->bindValue('mem_name', $_REQUEST["search_keyword"]);
    $search_result->execute();
    $search_resultRow = $search_result->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($search_resultRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
