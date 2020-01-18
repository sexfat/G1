<?php
  require_once('./connect_dd104g1.php');
  switch($_GET['get']){
    case 'song':
      try {
        $sql = "SELECT * FROM `total_station_music_library` WHERE song_no = {$_GET['song_no']}";
        $song = $pdo -> prepare($sql);
        $song -> execute();

        $songs = $song -> fetch(PDO::FETCH_ASSOC);
        echo json_encode($songs) ;

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      
      break;
    case 'message':
      try {
        $sql = "select message_board.message_no,`member`.mem_name,message_board.mem_no,
        message_board.song_no,message_board.message_info,report.re_no,report.re_sta
        from `message_board` left join `report` on (message_board.message_no = report.message_no) 
        left join `member` on (message_board.mem_no = `member`.mem_no)
        where message_board.song_no = {$_GET['song_no']};
        ";
        $message = $pdo -> prepare($sql);
        $message -> execute();

        $messages = $message -> fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($messages) ;

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      
      break;
    case "post_message":
      try {
        $sql = "INSERT INTO `message_board` (`message_no`, `mem_no`, `song_no`, `message_info`) 
        VALUE (NULL,{$_SESSION['mem_no']},:song_no,:message_info)";
        $message = $pdo -> prepare($sql);
        $message -> bindValue(':song_no',$_GET['song_no']);
        $message -> bindValue(':message_info',"{$_GET['text']}");
        $message -> execute();

        echo '送出成功';

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      break;
    
  }


