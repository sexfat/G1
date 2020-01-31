<?php
switch ( $_FILES['listPicFake']['error'] ){
	case 0: 
	    // if( file_exists("library") == false){
	    // 	mkdir("../img/library/");
	    // }
		$from = $_FILES['listPicFake']['tmp_name'];
		$to = "../img/library/".$_FILES['listPicFake']['name'];
        copy( $from, $to);
		break;
	case 1:
	case 2:
	case 3:
	case 4:
	default:
		echo "['error']: " , $_FILES['listPicFake']['error'] , "<br>"; 
}
?>
