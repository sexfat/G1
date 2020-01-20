<?php
  require_once('./connectBooks.php');
  session_start();
  switch($_POST['post']){
    case "post_message":
      try {
        $sql = "INSERT INTO `message_board` (`message_no`, `mem_no`, `song_no`, `message_info`,`message_time`) 
        VALUE (NULL,{$_SESSION['mem_no']},:song_no,:message_info,:message_time)";
        $message = $pdo -> prepare($sql);
        $message -> bindValue(':song_no',$_POST['song_no']);
        $message -> bindValue(':message_info',$_POST['text']);
        $message -> bindValue(':message_time',$_POST['message_time']);
        $message -> execute();
        echo '送出成功';

      } catch (PDOException $th) {
        echo $th->getMessage(), "<br>";
      }
      break;
  }
?>