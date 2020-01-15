<?php
try {
    require_once("./connectBooks.php");
    $sql = "select *
    from `activity`
    order by `activity_no` desc;";

    $act_content = $pdo -> query($sql);
    $act_contents = $act_content -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($act_contents);
   

} catch (PDOException $e) {
    echo "例外行號:", $e->getLine(), "<br>";
    echo "錯誤訊息:", $e->getMessage(), "<br>";
};
