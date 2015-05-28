<?php

	include 'inc/query_contact_list.php';

	function query_delete_contact($id){
		$conn = establish_db_connection();

		// Check connection
		if (mysqli_connect_errno()) {
		    die("Failed to connect to MySQL: " . mysqli_connect_error());
		}

		$sql = 'DELETE FROM contacts WHERE id="' . $id . '"';
		$result = mysqli_query($conn,$sql);
		if ( $result === false ) {
		  	die("Query error: " . mysqli_error($conn));
		}

		mysqli_close($conn);
	}

	query_delete_contact($_POST['id']);

	die(json_encode(query_contact_list()));

?>