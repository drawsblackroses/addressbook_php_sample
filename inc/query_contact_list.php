<?php

	include 'inc/database.php';

	function query_contact_list(){
		$conn = establish_db_connection();

		// Check connection
		if (mysqli_connect_errno()) {
		    die("Failed to connect to MySQL: " . mysqli_connect_error());
		}

		$sql = 'SELECT * FROM contacts ORDER BY last_name ASC';
		$result = mysqli_query($conn,$sql);
		if ( $result === false ) {
		  	die("Query error: " . mysqli_error($conn));
		} else {
		  	$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
		}

		mysqli_close($conn);

		return $data;
	}

?>