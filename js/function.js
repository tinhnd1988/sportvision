(function($) {
	$(document).ready(function() {
		ball = $('.inner.ball');
		status = 0;

		$('.playground .outer .in').on("click", function(){
			if (status == 0)
				startGame();
			else
				playingGame();
		});

	});

	function startGame(){
		//LOADING
		$('.inner.ball > span').hide();
		$('.inner.ball > .loading_dots').show();
		$('.inner.ball').addClass('transition');
		setTimeout(moveBall, Math.floor(Math.random() * (4000-2000+1)) + 2000);
		//moveBall();
	}

	function playingGame(){
		alert('aa');
	}

	function moveBall(){
		status = 1;
		$('.inner.ball > .loading_dots').hide();
		ball.height(ball.parent().height() - 4);
		ball.width(ball.parent().width() - 4);
	}
})(jQuery);
