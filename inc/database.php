<?php
	function establish_db_connection(){
		$_SERVER = "localhost";
		$_USERNAME = "root";
		$_PASSWORD = "Shorty08liz";
		$_DATABASE = "online_phone_book";

		return mysqli_connect($_SERVER, $_USERNAME, $_PASSWORD, $_DATABASE);
	}
?>