<?php
	function connectDB()
	{
	    $servername = "localhost";
	    $username = "root";
	    $password = "hacker";
	    $dbname = "sportvision";

	    if (!mysql_connect($servername, $username, $password))
	        die("Can't connect to database");

	    if (!mysql_select_db($dbname))
	        die("Can't select database");		
	}

	function completeGame($FBID)
	{
		checkPerm();
		$query = 'INSERT INTO data (FBID, COMPLETED)'.
				' VALUES ('.$FBID.', 1)'.
				' ON DUPLICATE KEY'.
  				' UPDATE COMPLETED=COMPLETED+1';

		$result = mysql_query($query);
		if (!$result) {
		    die('[completeGame] ERROR ON UPDATE DATA');
		}		
		echo ($result);
	}

	function shareGame($FBID)
	{
		checkPerm();
		$query = 'INSERT INTO data (FBID, SHARED)'.
				' VALUES ('.$FBID.', 1)'.
				' ON DUPLICATE KEY'.
  				' UPDATE SHARED=SHARED+1';

		$result = mysql_query($query);
		if (!$result) {
		    die('[shareGame] ERROR ON UPDATE DATA');
		}		
		echo ($result);
	}

	function replayGame($FBID)
	{
		checkPerm();
		$query = 'INSERT INTO data (FBID, REPLAYED)'.
				' VALUES ('.$FBID.', 1)'.
				' ON DUPLICATE KEY'.
  				' UPDATE REPLAYED=REPLAYED+1';

		$result = mysql_query($query);
		if (!$result) {
		    die('[replayGame] ERROR ON UPDATE DATA');
		}		
		echo ($result);
	}

	function checkPerm()
	{
		if (!array_key_exists("HTTP_REFERER", $_SERVER))
			exit('[ajaxshareGame] ERROR! PERMISSION DENIED');
		elseif (parse_url($_SERVER["HTTP_REFERER"])["host"] != $_SERVER["HTTP_HOST"])
			exit('[ajaxshareGame] ERROR! PERMISSION DENIED');		
	}

	function pageviewedCount()
	{
		if (!isset($_SESSION['views'])) 
		{
			$_SESSION['views'] = 1;
			updatePageViewed();
		}
	}

	function updatePageViewed()
	{
		$query = 'UPDATE summary SET value=value+1 WHERE name="pageviewed"';
		$result = mysql_query($query);
	}

	function generateResultImage($score, $fbid)
	{
		// Set the content-type
		header('Content-Type: image/jpeg');

		// Create the image
		$im = @ImageCreateFromJPEG('img/share_bg.jpg');
		$text_color = imagecolorallocate($im, 0, 0, 0);
		
		// The text to draw
		$text_1 = 'I got average '.$score.'ms from the test';
		$text_2 = 'How about you ?';
		// Replace path by your own font path
		//$font = 'fonts/arial.ttf';
		$font = 'fonts/AdobeCaslonProBold.ttf';

		// Add some shadow to the text
		//Center string
		$fontwidth = 16; //Fontwidth for Adobe Caslon Pro
		$center = (imagesx($im)/2) - ($fontwidth*(strlen($text_1)/2));
		// // Add the text
		imagettftext($im, 30, 0, $center, 150, $text_color, $font, $text_1);
		imagettftext($im, 30, 0, 155, 200, $text_color, $font, $text_2);
		//imagestring($im, $font, 5, 5,  'A Simple Text String', $text_color);
		// Using imagepng() results in clearer text compared with imagejpeg()
		imagepng($im);
		imagedestroy($im);
	}
?>