<?php
	require_once('functions.php');
	
	if(isset($_GET["resultToImage"])) 
	{
		$FBID = isset($_GET["FBID"]) ? $_GET["FBID"] : 'no_fbid';
		generateResultImage($_GET["resultToImage"], $FBID);
	}
?>