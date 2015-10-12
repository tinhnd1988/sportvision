(function($) {
	$(document).ready(function() {
		animationTime = 150; //ms
		transEndEventName = whichTransEndEventNames();
		transEndEventFiredTime = 0;
		resultTime = -1;
		resultTotal = {};
		timePlayed = 0;
		rankPosition = 0;
		status = 0;
		$ball = $('.inner.ball');		

		bindClick();
		setRankImage();

		$ball.on(transEndEventName, function(){
			if (transEndEventFiredTime < 1)
			{
				status = 2;
				resultTime = new Date().getTime();
				transEndEventFiredTime++;
			}		
		});

		$('#summary .replay').click(function(event) {
			resetAll();
			return false;
		});

		//fancyBox for summary
	    $("#summary").fancybox({
	    	openEffect : 'elastic',
	    	closeEffect	: 'elastic',
	    	openSpeed: 250,
			closeBtn: false,
			autoCenter: true,
			scrolling : 'no',
		    afterClose : function(){
		    	resetAll();
		    },		
	    });		
	});

	function bindClick(){
		$('.playground .outer').removeAttr('style');
		$ball.css('cursor', 'pointer');
		$('.playground .outer').on("click",'.in', function(){
			(status == 0) ? startGame() : playingGame();
		});		
	}

	function unbindClick(){
		$('.playground .outer').unbind("click").css('cursor', 'default');
		$ball.css('cursor', 'default');
	}

	function resetAll(){
		bindClick();
		resultTime = -1;
		resultTotal = {};
		timePlayed = 0;
		rankPosition = 0;
		status = 0;
		$ball.removeAttr("style").children('.loading_dots').hide();
		$ball.children('span').text('Start').show();
		$('.second').html('');
		$('.pathway').removeClass('playing played');
		$('.progress').removeClass('transition').removeAttr('style');
		$('.ranking').removeClass('reached transition');
		$('.step .value').html('1');
	}

	function startGame(){
		//Reconfig
		$ball.removeAttr("style");
		transEndEventFiredTime = 0;
		//LOADING
		status = 1;
		$ball.children('span').hide();
		$ball.children('.loading_dots').show();
		//Result status
		timePlayed++;
		$('.step .value').html(timePlayed);
		$('.result #pathway_'+timePlayed).addClass('playing');
		$('.result #pathway_'+timePlayed+' > .data > .second').text('Now Playing');
		nTime = Math.floor(Math.random() * (4000-2000+1)) + 2000;
		timeoutStart = setTimeout(moveBall, nTime);
	}

	function playingGame(){
		var $this = new Object();
		$this.playground = $('.container > .playground');

		if (status == 1)
		{
			clearTimeout(timeoutStart);
			timePlayed--;
			$this.playground.find('.inner.ball').removeAttr("style").children('.loading_dots').hide();
			$this.playground.find('.inner.ball > span').text('Too Early! Play Again').show();
			status = 0;	
		}
		else if (status == 2)
		{
			unbindClick();
			crrTime = new Date().getTime();
			result =  crrTime - resultTime;
			if (result >= 0)
			{
				$this.playground.find('.step > span.value').text(timePlayed);
				$this.playground.find('.inner.ball > span').text(result+'ms').show();
				//Update Result
				resultTotal[timePlayed] = result;
				updateResult(timePlayed, result);
				//Update Rank
				updateRank();
				//Is 5th played
				if (timePlayed == 5)
				{
					var totalRank =0;
					var avgRank = 0;
					for (var i = 1; i <= timePlayed; i++) {
						totalRank += resultTotal[i];
						avgRank = totalRank / timePlayed;
					};

					setTimeout(function(){
						$('#result span').html(Math.round(avgRank * 100) / 100);
						$('#rankpos span').html(rankPosition);
					}, 500);
					$('#summary').trigger('click');
					$this.playground.find('.inner.ball > span').append('<p>GAME OVER</p>');
					unbindClick();
					$this.playground.find('.inner.ball').css('cursor', 'default');
					$('.popupIn .share').show();
				}
				else
				{
					setTimeout(function(){
						$this.playground.find('.inner.ball > span').append('<p>Played '+timePlayed+' of 5<br>Click to start</p>');
						//Reset status
						status = 0;							
						bindClick();						
					},500);
				}
			}
			else
				console.log('ERROR');
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

	function updateResult(timePlayed, result){
		$this = new Object();
		$this.result = $('.container > .result');
		setTimeout(function(){
			$this.result.find('#pathway_'+timePlayed).removeClass('playing');
			$this.result.find('#pathway_'+timePlayed).addClass('played');
			$this.result.find('#pathway_'+timePlayed+' > .data > span.second').text(result+'ms');
		}, 500);		
	}

	function updateRank(){
		if (timePlayed > 5){
			console.log('ERROR');
			return;
		}

		totalRank = 0;
		avgRank = 0;
		for (var i = 1; i <= timePlayed; i++) {
			Rank = 100 - (resultTotal[i] * 100) / 1000;
			(Rank <= 0) ? 0 : '';
			totalRank += Rank;
			avgRank = totalRank / timePlayed;
		};
		setTimeout(function(){
			$('.container > .rank > .progress').addClass('transition').show().width(avgRank+'%');
			rankReached(avgRank);			
		},500);

	}

	function rankReached(avgRank){
		$this = $('.container > .rank');
		rankLevelTotal = $this.find('.block').length;
		for (var i = 1; i <= rankLevelTotal; i++){
			if ((20*i)-20 <= avgRank){
				$this.find('#rank_level_'+i+' > .ranking').addClass('transition reached');
				rankPosition = i;
			}
			else
				$this.find('#rank_level_'+i+' > .ranking').removeClass('reached');
		}
		setRankImage();
	}

	function setRankImage(){
		winWidth = $(window).width();
		yPos = -285;
		posStep = 65;
		if (winWidth <= 380){
			yPos = -144;
			posStep = 34;			
		}		
		else if (winWidth <= 600){
			yPos = -174;
			posStep = 40;			
		}

		$('#rank.image').css('background-position', '0px '+ (yPos + (posStep*(rankPosition-1))) +'px');
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