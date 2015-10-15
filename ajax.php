<?php
	require_once('functions.php');
	
	if(isset($_GET["resultToImage"])) 
	{
		$FBID = isset($_GET["FBID"]) ? $_GET["FBID"] : 'no_fbid';
		generateResultImage($_GET["resultToImage"], $FBID);
	}

	if(isset($_GET["function"])) 
	{
		$function = $_GET["function"];
		if (function_exists($function)){
			$FBID = (isset($_GET["FBID"])) ? ($_GET["FBID"]) : 0;
			connectDB();
			$function($FBID);
		}
	}

?>