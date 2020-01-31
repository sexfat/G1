<?php
  switch ($_GET['get']) {
    case "actor":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `actor`";
        $controler = $pdo->prepare($sql);
        $controler->execute();

        $controlers = $controler->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($controlers);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "member":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `member`";
        $member = $pdo->prepare($sql);
        $member->execute();

        $members = $member->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($members);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "song":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `total_station_music_library`";
        $song = $pdo->prepare($sql);
        $song->execute();

        $songs = $song->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($songs);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "vote":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `vote`";
        $vote = $pdo->prepare($sql);
        $vote->execute();

        $votes = $vote->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($votes);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "activity":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `activity`";
        $vote = $pdo->prepare($sql);
        $vote->execute();

        $votes = $vote->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($votes);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "edit":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "SELECT * FROM `activity` where activity_no = {$_GET['activity_no']}";
        $edit = $pdo->prepare($sql);
        $edit->execute();

        $edits = $edit->fetch(PDO::FETCH_ASSOC);
        echo json_encode($edits);
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "delete":
      try {
        require_once('./connect_dd104g1.php');
        $sql = "DELETE FROM `activity` where activity_no = {$_GET['activity_no']}";
        $delete = $pdo->prepare($sql);
        $delete->execute();

        echo "刪除成功";

      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "report":
      try {
        require_once('./connect_dd104g1.php');
<<<<<<< HEAD
        $sql = "SELECT * FROM `report`";
=======
        $sql = "SELECT report.re_no,report.message_no,report.mem_no,report.re_sta,message_board.message_info 
        FROM `report` inner join `message_board` on  
        (message_board.message_no = report.message_no)";

>>>>>>> 0314f3b0329fceb310a2e97643c853bebef6d300
        $report = $pdo->prepare($sql);
        $report->execute();
        
        $reports = $report -> fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($reports);

      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
    case "hid_report": // 屏蔽留言
      try {
        require_once('./connect_dd104g1.php');
        $sql = "UPDATE `report` SET `re_sta` = 1 WHERE `re_no`=:re_no";
        $report = $pdo->prepare($sql);
        $report -> bindValue(':re_no',$_GET['re_no']);
        $report->execute();
        echo "刪除成功";
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
      break;
  }
?>
