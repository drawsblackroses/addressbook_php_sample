<?php

	include 'inc/query_contact_list.php';

	function query_insert_contact($f_name,$l_name,$phone){
		$conn = establish_db_connection();

		// Check connection
		if (mysqli_connect_errno()) {
		    die("Failed to connect to MySQL: " . mysqli_connect_error());
		}

		$sql = 'INSERT INTO contacts (first_name,last_name,phone) '.
				'VALUES ("' . $f_name . '","' . $l_name . '","' . preg_replace("/[^0-9]/", "", $phone) . '")';
		
		$result = mysqli_query($conn,$sql);
		if ( $result === false ) {
		  	die("Query error: " . mysqli_error($conn));
		}

		mysqli_close($conn);
	}

	query_insert_contact($_POST['first_name'],$_POST['last_name'],$_POST['phone']);

	die(json_encode(query_contact_list()));

?>