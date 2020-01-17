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

        echo '送出成功';

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      break;
  }
?>