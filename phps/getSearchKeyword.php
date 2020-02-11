<?php
try {
    require_once("./connectBooks.php");
    $sql = "SELECT song_name FROM `total_station_music_library` order by `donate_acount` DESC limit 6";
    $keyword = $pdo->query($sql);
    $keywordRow = $keyword->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($keywordRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
