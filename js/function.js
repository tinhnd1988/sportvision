(function($) {
	$(document).ready(function() {
		animationTime = 200; //ms
		var transEndEventName = whichTransEndEventNames();
		resultTime = -1;
		var result = {};

		status = 0;
		$ball = $('.inner.ball');

		

		$('.playground .outer .in').on("click", function(){
			(status == 0) ? startGame() : playingGame();
		});

		$ball.one(transEndEventName, function(e){
			$ball.removeClass('waiting');
			status = 2;
			resultTime = new Date().getTime();			
		});

	});

	function startGame(){
		//LOADING
		status = 1;
		$ball.addClass('waiting');
		$ball.children('span').hide();
		$ball.children('.loading_dots').show();
		nTime = Math.floor(Math.random() * (4000-2000+1)) + 2000;
		timeoutStart = setTimeout(moveBall, nTime);
		//setTimeout(function(){status = 1}, animationTime);
		//moveBall();
	}

	function playingGame(){
		$this = $ball.children('span');

		if (status == 1)
		{
			clearTimeout(timeoutStart);
			$this.parent().children('.loading_dots').hide();
			$this.parent().removeAttr("style");
			$this.text('Too Early! Play Again');
			$this.show();
			status = 0;
		}
		else if (status == 2)
		{
			crrTime = new Date().getTime();
			result =  crrTime - resultTime;
			if (result >= 0)
			{
				$this.text(result+'ms');
				$this.show();
			}
			else
				alert('ERROR');

		}	
	}

	function moveBall(){
		$('.inner.ball > .loading_dots').hide();

	    var myTransition = ($.browser.webkit)  ? '-webkit-transition' :
	                       ($.browser.mozilla) ? '-moz-transition' : 
	                       ($.browser.msie)    ? '-ms-transition' :
	                       ($.browser.opera)   ? '-o-transition' : 'transition',
	        myCSSObj     = {height: $ball.parent().height() - 4,
	        				width: $ball.parent().width() - 4};

	    myCSSObj[myTransition] = 'all '+animationTime+'ms ease';
	    $ball.css(myCSSObj);
	}

	function whichTransEndEventNames() {
	    var el = document.createElement('fake'),
	        transEndEventNames = {
	            'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
	            'MozTransition'    : 'transitionend',      // only for FF < 15
	            'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
	        };

	    for(var t in transEndEventNames){
	        if( el.style[t] !== undefined ){
	            return transEndEventNames[t];
	        }
	    }
	}
})(jQuery);
