<?php
 try {
    require_once("./connectBooks.php");
    session_start();
    // $song_no = $pdo->lastInsertId();
    // $song_nosql = "SELECT LAST_INSERT_ID(['song_no']) as id";
    // $adddelt = $pdo->query($song_nosql);
    // $adddelts = $adddelt-> fetchColumn();
    // $delsql = "DELETE from `total_station_music_library` where :song_no";
   
    $delsql = "delete from total_station_music_library where song_no=:song_no";
    $adddelt = $pdo->prepare($delsql);
    $adddelt->bindValue(':song_no', $_GET["name"]);
    // $adddelt->bindValue(':song_no', 36);
    // $adddelt->bindValue(':id', $_GET['song_no']);
    // $adddelt->bindValue(':song_no', $_POST['song_no']);
    $adddelt->execute();
    // $resultSet = $adddelt -> fetchAll();
    // echo json_encode($resultSet);
    if ($adddelt->rowCount() > 0) {
        echo 'success';
    } else {
        echo 'fail';
    }
} catch (PDOException $e) {
    echo '例外行號：', $e->getLine(), '<br>';
    echo '錯誤訊息：', $e->getMessage(), '<br>';
};
?>