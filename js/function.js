(function($) {
	$(document).ready(function() {
		animationTime = 200; //ms
		transEndEventName = whichTransEndEventNames();
		transEndEventFiredTime = 0;
		resultTime = -1;
		result = {};
		timePlayed = 0;
		status = 0;
		$ball = $('.inner.ball');		

		$('.playground .outer .in').on("click", function(){
			(status == 0) ? startGame() : playingGame();
		});

		$ball.on(transEndEventName, function(){
			if (transEndEventFiredTime < 1)
			{
				$ball.removeClass('waiting');
				status = 2;
				resultTime = new Date().getTime();
				transEndEventFiredTime++;
			}		
		});

	});

	function startGame(){
		//Reconfig
		$ball.removeAttr("style");
		transEndEventFiredTime = 0;
		//LOADING
		status = 1;
		$ball.addClass('waiting');
		$ball.children('span').hide();
		$ball.children('.loading_dots').show();
		//Result status
		timePlayed++;
		$('.result #pathway_'+timePlayed).addClass('playing');
		$('.result #pathway_'+timePlayed+' > .data > .second').text('Now Playing');
		nTime = Math.floor(Math.random() * (4000-2000+1)) + 2000;
		timeoutStart = setTimeout(moveBall, nTime);
		//setTimeout(function(){status = 1}, animationTime);
		//moveBall();
	}

	function playingGame(){
		var $this = new Object();
		$this.playground = $('.container > .playground');
		$this.result = $('.container > .result');

		if (status == 1)
		{
			clearTimeout(timeoutStart);
			timePlayed--;
			$this.playground.find('.inner.ball').children('.loading_dots').hide();
			$this.playground.find('.inner.ball').removeAttr("style");
			$this.playground.find('.inner.ball > span').text('Too Early! Play Again');
			$this.playground.find('.inner.ball > span').show();
			status = 0;
		}
		else if (status == 2)
		{
			crrTime = new Date().getTime();
			result =  crrTime - resultTime;
			if (result >= 0)
			{
				$this.playground.find('.step > span.value').text(timePlayed);
				$this.playground.find('.inner.ball > span').text(result+'ms');
				$this.playground.find('.inner.ball > span').show();
				//Update Result
				setTimeout(function(){
					$this.result.find('#pathway_'+timePlayed).removeClass('playing');
					$this.result.find('#pathway_'+timePlayed).addClass('played');
					$this.result.find('#pathway_'+timePlayed+' > .data > span.second').text(result+'ms');
				}, 500);
				//Update Rank
				setTimeout(updateRank,500);
				//Is 5th played
				if (timePlayed == 5)
				{
					alert('Game summary popup');
				}
				else
				{
					$this.playground.find('.inner.ball > span').html('Played '+timePlayed+' of 5<br>Click to start');

				}
				//Reset status
				status = 0;
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

	function updateRank(){
		alert('Update ranking here');
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
