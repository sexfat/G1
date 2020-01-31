<?php
try {
    require_once("./connectBooks.php");
    $sql = "SELECT music.song_no,song_idn,song_name,song_pic,donate_acount,fav_total,song_addr, mem.mem_name FROM `total_station_music_library` as music, `member` as mem where music.mem_no = mem.mem_no order by music.fav_total DESC limit 10";
    $rank_info = $pdo->query($sql);
    $rankRow = $rank_info->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rankRow);
} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
