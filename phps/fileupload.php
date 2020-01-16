<?php
  // require_once("songsupload.php");
  if($_FILES['song_pic']['error']>0){
    exit("上傳失敗！");
  }
  // echo $_FILES['song_pic']['tmp_name'];
  // $from = $_FILES['song_pic']['tmp_name'];
  // $to = './img/'. $_FILES['song_pic']['name'];
  // echo copy( $from , $to )
  move_uploaded_file($_FILES['song_pic']['tmp_name'],'../img/collection'.$_FILES['song_pic']['name']);
  echo '<a href="file/'.$_FILES['song_pic']['name'].'">img/collection'.$_FILES['song_pic']['name'].'</a>';
?>