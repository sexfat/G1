<?php
try {
    require_once("connectBooks.php");
    session_start();
    $mem_no = $_SESSION["mem_no"];
    $sql = "SELECT `mem_img` FROM `member` WHERE `mem_no` = {$_SESSION['mem_no']}";
    $mem_img = $pdo->query($sql);
    $imgRow = $mem_img->fetch(PDO::FETCH_ASSOC);

    switch ($_FILES['upfile']['error']) {
        case UPLOAD_ERR_OK:
            $dir = "../memberRepository/photo/$mem_no";
            if (file_exists($dir) === false) {
                mkdir($dir); //make directory
            } else {
                unlink("$dir/".implode($imgRow));
            }

            $file_info = pathinfo($_FILES['upfile']['name']);
            $file_name = "{$mem_no}.{$file_info['extension']}";

            $from = $_FILES['upfile']['tmp_name'];
            $to = "$dir/" . "$file_name";
            if (copy($from, $to)) {
                $sql = "update `member` set `mem_img` = :mem_img where mem_no = $mem_no";
                $mem_img = $pdo->prepare($sql);
                $mem_img->bindValue(":mem_img", $file_name);
                $mem_img->execute();
                echo "Upload success!";
            } else {
                echo "Upload fail!";
            }
            break;
        case UPLOAD_ERR_INI_SIZE:
            echo "The file is too large, it can't over ". ini_get("upload_max_filesize"). ".";
            break;
        case UPLOAD_ERR_FORM_SIZE:
            echo "The file is too large, it can't over ". $_POST["MAX_FILE_SIZE"]. "."  ;
            break;
        case UPLOAD_ERR_PARTIAL:
            echo "Error during upload, Please upload again.";
            break;
        default:
            echo "['error']: ". $_FILES['upfile']['error'];
    }
} catch (PDOException $e) {
    echo "Upload fail!";
}
