(function($) {
	$(document).ready(function() {
		animationTime = 3500; //ms
		$ball = $('.inner.ball');
		status = 0;

		$('.playground .outer .in').on("click", function(){
			(status == 0) ? startGame() : playingGame();
		});

		$ball.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			status = 2;
		});

	});

	function startGame(){
		//LOADING
		$('.inner.ball > span').hide();
		$('.inner.ball > .loading_dots').css("display", "table-cell");
		nTime = Math.floor(Math.random() * (4000-2000+1)) + 2000;
		setTimeout(moveBall, nTime);
		//setTimeout(function(){status = 1}, animationTime);
		//moveBall();
	}

	function playingGame(){
		if (status == 1)
		{
			$this = $('.inner.ball > span');
			$this.parent().clearQueue();
			$this.parent().stop();
			$this.text('Too Early! Play Again');
			$this.show();
		}
		else if (status == 2)
			alert('Good');
	}

	function moveBall(){
		status = 1;
		$('.inner.ball > .loading_dots').hide();
		$('.inner.ball').addClass('transition');

	    var myTransition = ($.browser.webkit)  ? '-webkit-transition' :
	                       ($.browser.mozilla) ? '-moz-transition' : 
	                       ($.browser.msie)    ? '-ms-transition' :
	                       ($.browser.opera)   ? '-o-transition' : 'transition',
	        myCSSObj     = {height: $ball.parent().height() - 4,
	        				width: $ball.parent().width() - 4};

	    myCSSObj[myTransition] = 'all '+animationTime+'ms ease';
	    $ball.css(myCSSObj);
	}

})(jQuery);
