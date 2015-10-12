<?php
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