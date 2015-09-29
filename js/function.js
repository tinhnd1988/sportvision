(function($) {
	$(document).ready(function() {
		animationTime = 3500; //ms
		ball = $('.inner.ball');
		status = 0;

		$('.playground .outer .in').on("click", function(){
			(status == 0) ? startGame() : playingGame();
		});

		ball.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			status = 2;
		});

	});

	function startGame(){
		//LOADING
		$('.inner.ball > span').hide();
		$('.inner.ball > .loading_dots').show();
		$('.inner.ball').addClass('transition');
		nTime = Math.floor(Math.random() * (4000-2000+1)) + 2000;
		setTimeout(moveBall, nTime);
		//setTimeout(function(){status = 1}, animationTime);
		//moveBall();
	}

	function playingGame(){
		if (status == 1)
			alert('Early');
		else if (status == 2)
			alert('Good');
	}

	function moveBall(){
		status = 1;
		$('.inner.ball > .loading_dots').hide();
		ball.height(ball.parent().height() - 4);
		ball.width(ball.parent().width() - 4);
	}
})(jQuery);
