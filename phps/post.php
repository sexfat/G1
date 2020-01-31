<?php
switch ($_POST['post']) {
  case "add_activity":
    try {
      switch ($_FILES['act_img']['error']) {
        case 0;
          if (file_exists('../img') == false) {
            mkdir('img');
            if (file_exists('../img/activity') == false) {
              mkdir('activity');
            }
          }
          $from = $_FILES['act_img']['tmp_name'];
          $to = '../img/activity/' . $_FILES['act_img']['name'];
          if (copy($from, $to)) {
            echo "上傳成功";
          }
          break;
      }
      require_once('./connect_dd104g1.php');
      $sql = "INSERT INTO `activity`(`activity_no`, `activity_name`, `activity_res`, `activity_str`, `activity_fin`, `activity_con`, `activity_img`) VALUES (:activity_num,:activity_name,'0',:activity_str,:activity_fin,:activity_Introduction,:activity_img)";
      $add_activity = $pdo->prepare($sql);

      $add_activity->bindValue(':activity_num', $_POST['activity_num']);
      $add_activity->bindValue(':activity_name', $_POST['activity_name']);
      $add_activity->bindValue(':activity_str', "{$_POST['activity_start']}");
      $add_activity->bindValue(':activity_fin', "{$_POST['activity_fin']}");
      $add_activity->bindValue(':activity_Introduction', $_POST['activity_Introduction']);
      $add_activity->bindValue(':activity_img', substr($to,1));
      $add_activity->execute();
    } catch (PDOException $th) {
      echo $th->getMessage();
    }
    break;
  case "updata_activity":
    try {
      switch ($_FILES['act_img']['error']) {
        case 0: 
          if (file_exists('../img') == false) {
            mkdir('img');
            if (file_exists('../img/activity') == false) {
              mkdir('activity');
            }
          }
          $from = $_FILES['act_img']['tmp_name'];
          $to = '../img/activity/' . $_FILES['act_img']['name'];
          if (copy($from, $to)) {
            echo "上傳成功";
          }
          break;
      }
      
      require_once('./connect_dd104g1.php');


      if ($_FILES['act_img']['error'] != 4) {
        $sql = "UPDATE `activity` SET 
        `activity_name`=:activity_name,
        `activity_res`='0',`activity_str`=:activity_str,
        `activity_fin`=:activity_fin,`activity_con`=:activity_Introduction,
        `activity_img`= :activity_img WHERE `activity_no`=:activity_num";
      } else {
        $sql = "UPDATE `activity` SET 
        `activity_name`=:activity_name,
        `activity_res`='0',`activity_str`=:activity_str,
        `activity_fin`=:activity_fin,`activity_con`=:activity_Introduction
        WHERE `activity_no`=:activity_num";
      }

      $update_activity = $pdo->prepare($sql);

      if($_FILES['act_img']['error'] == 0){
        $update_activity->bindValue(':activity_img', $to);
      }
      $update_activity->bindValue(':activity_num', $_POST['activity_num']);
      $update_activity->bindValue(':activity_name', $_POST['activity_name']);
      $update_activity->bindValue(':activity_str', "{$_POST['activity_start']}");
      $update_activity->bindValue(':activity_fin', "{$_POST['activity_fin']}");
      $update_activity->bindValue(':activity_Introduction', $_POST['activity_Introduction']);

      $update_activity->execute();
    } catch (PDOException $th) {
      echo $th->getMessage();
    }
    break;
}
