(function($) {
	$(document).ready(function() {
		$('.playground .outer .in').on("click", function(){
			startGame();
		});

	});

	function startGame(){
		//LOADING
		$('.inner.ball > span').hide();
		$('.inner.ball > .loading_dots').show();
		setTimeout(moveBall, Math.floor(Math.random() * (4000-2000+1)) + 2000);
		//moveBall();
	}

	function moveBall(){
		$('.inner.ball > .loading_dots').hide();
		
		ball = $('.inner.ball');
		ball.height(ball.parent().height() - 4);
		ball.width(ball.parent().width() - 4);
	}
})(jQuery);