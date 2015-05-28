<?php
	
	include 'inc/query_contact_list.php';
	
	die(json_encode(query_contact_list()));

?>