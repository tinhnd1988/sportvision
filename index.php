<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/loading.css">
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/jquery-migrate-1.2.1.min.js"></script>
		<script type="text/javascript" src="js/function.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Sport Vision Test game</title>
	</head>
	<body>
		<div class="container">
			<div class="playground">
				<div class="circle outer out">
					<div class="circle outer in">
						<div class="circle inner ball">
							<span>Start</span>
							<div class="loading_dots">
							  	<span></span>
							  	<span></span>
						 		<span></span>
							</div>							
						</div>
					</div>
				</div>
				<div class="step">
					<span class="value">0</span> / 5
				</div>
			</div>	

			<div class="result">
				<span>Your Results:</span>
				<div id="pathway_1" class="pathway">
					<div class="data">
						<label>1st play:</label>
						<br>
						<span class="second"></span>
					</div>
				</div>
				<div id="pathway_2" class="pathway">
					<div class="data">
						<label>2nd play:</label>
						<br>
						<span class="second"></span>
					</div>					
				</div>
				<div id="pathway_3" class="pathway">
					<div class="data">
						<label>3rd play:</label>
						<br>
						<span class="second"></span>
					</div>					
				</div>
				<div id="pathway_4" class="pathway">
					<div class="data">
						<label>4th play:</label>
						<br>
						<span class="second"></span>
					</div>					
				</div>
				<div id="pathway_5" class="pathway">
					<div class="data">
						<label>5th play:</label>
						<br>
						<span class="second"></span>
					</div>					
				</div>												
			</div>

			<div class="rank">
				<div class="progress">

				</div>
				<span>How you rank:</span>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking">
						very slow
					</div>
				</div>
				<div id="rank_level_2" class="block">
					<span>TEXT</span>
					<div class="ranking">
						slow
					</div>
				</div>
				<div id="rank_level_3" class="block">
					<span>TEXT</span>
					<div class="ranking">
						medium
					</div>
				</div>
				<div id="rank_level_4" class="block">
					<span>TEXT</span>
					<div class="ranking">
						fast
					</div>
				</div>
				<div id="rank_level_5" class="block">
					<span>TEXT</span>
					<div class="ranking">
						very fast
					</div>
				</div>																																								
			</div>						
		</div>
		<div id="summary">
			<div class="overlay"></div>
			<div class="popupOut">
				<div class="popupIn">
					<h2>GAME OVER</h2>
					<p>Your result</p>
					<p id="result"><span>0000</span> ms</p>
					<button class="replay">Replay</button>
				</div>
			</div>
		</div>
	</body>
</html>