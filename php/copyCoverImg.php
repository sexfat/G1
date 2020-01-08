<?php
switch ( $_FILES['listPicFake']['error'] ){
	case 0: 
	    if( file_exists("library") == false){
	    	mkdir("library");
	    }
		$from = $_FILES['listPicFake']['tmp_name'];
		$to = "../img/library/".$_FILES['listPicFake']['name'];
        copy( $from, $to);
        // if(copy( $from, $to)){
		// 	echo "上傳成功 <br>";
		// }else{
		// 	echo "上傳失敗 <br>";
		// }
		break;
	case 1:
	case 2:
	case 3:
	case 4:
	default:
		echo "['error']: " , $_FILES['listPicFake']['error'] , "<br>"; 	
}
?>
