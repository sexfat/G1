<?php
 try {
    require_once("./connectBooks.php");
    $sql = "DELETE from `total_station_music_library`
            where song_no=:song_no";
    $adddelt = $pdo->prepare($sql);
    
    $adddelt->bindValue(':song_no', $_POST['song_no']);
    $adddelt->execute();
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