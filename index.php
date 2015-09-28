<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/loading.css">
		<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="js/function.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">

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
					3 / 5
				</div>
			</div>	

			<div class="result">
				<span>Your Results:</span>
				<div id="pathway_1" class="pathway played">
					<div class="data">
						<label>1st play:</label>
						<br>
						<span class="second">540ms</span>
					</div>
				</div>
				<div id="pathway_2" class="pathway played">
					<div class="data">
						<label>1st play:</label>
						<br>
						<span class="second">540ms</span>
					</div>					
				</div>
				<div id="pathway_3" class="pathway playing">
					<div class="data">
						<label>1st play:</label>
						<br>
						<span class="second">Now Playing</span>
					</div>					
				</div>
				<div id="pathway_4" class="pathway">
					
				</div>
				<div id="pathway_5" class="pathway">
					
				</div>												
			</div>

			<div class="rank">
				<div class="progress">

				</div>
				<span>How you rank:</span>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking reached">
						icon
					</div>
				</div>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking reached">
						icon
					</div>
				</div>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking">
						icon
					</div>
				</div>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking">
						icon
					</div>
				</div>
				<div id="rank_level_1" class="block">
					<span>TEXT</span>
					<div class="ranking">
						icon
					</div>
				</div>																																								
			</div>						
		</div>
	</body>
</html>