<?php
  require_once('./connect_dd104g1.php');
  session_start();
  switch($_POST['post']){
    case "post_message":
      try {
        $sql = "INSERT INTO `message_board` (`message_no`, `mem_no`, `song_no`, `message_info`) 
        VALUE (NULL,{$_SESSION['mem_no']},:song_no,:message_info)";
        $message = $pdo -> prepare($sql);
        $message -> bindValue(':song_no',$_POST['song_no']);
        $message -> bindValue(':message_info',$_POST['text']);
        $message -> execute();

        $sql = "UPDATE `member` SET mem_point = mem_point - {$_POST['donate_money']} WHERE mem_no = {$_SESSION['mem_no']}";
        $donate = $pdo -> prepare($sql);
        $donate -> execute();

        $sql = "UPDATE `total_station_music_library` SET 	donate_acount = 	donate_acount + {$_POST['donate_money']} 
        WHERE song_no = {$_POST['song_no']}" ;
        $donate = $pdo -> prepare($sql);
        $donate -> execute();

        $sql = "INSERT INTO `donate_record` (`donate_no`, `mem_no`, `song_no`, `donate_acount`) 
        VALUES (NULL,{$_SESSION['mem_no']},{$_POST['song_no']},{$_POST['donate_money']})";
        $donate_record = $pdo -> prepare($sql);
        $donate_record -> execute();

        echo '送出成功';

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      break;
  }
?>