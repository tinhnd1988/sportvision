(function($) {
	//Change your appID here
	var appID = 1699249870294264;	
	$(document).ready(function() {
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : appID,
	      xfbml      : true,
	      version    : 'v2.4'
	    });

	    getLoginStatus();
	    FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
		FB.Event.subscribe('auth.statusChange', onStatusChange);
	    // ADD ADDITIONAL FACEBOOK CODE HERE
	    //Bind share button
		$('.popupIn').on('click','.share', shareToFacebook);
	  };

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
	});

	function getLoginStatus()
	{
		FB.getLoginStatus(function(response) {
		  	if (response.status === 'connected') 
		  	{
			    // the user is logged in and has authenticated your
			    // app, and response.authResponse supplies
			    // the user's ID, a valid access token, a signed
			    // request, and the time the access token 
			    // and signed request each expire
			    var uid = response.authResponse.userID;
			    var accessToken = response.authResponse.accessToken;
		  	} 
		  	else if (response.status === 'not_authorized') 
		  	{
			    // the user is logged in to Facebook, 
			    // but has not authenticated your app
		  	} 
		  	else 
		  	{
		    	console.log('Not logged in to Facebook');
		    	// the user isn't logged in to Facebook.
	  		}
 		});
	}

	function login(callback) {
	  FB.login(callback);
	}

	function loginCallback(response) {
	  console.log('loginCallback',response);
	  if(response.status != 'connected') {
	    top.location.href = 'https://www.facebook.com/appcenter/';
	  }
	}

	function onStatusChange(response) {
	  if( response.status != 'connected' ) {
	    login(loginCallback);
	  } else {
	    //WELCOME ACTION HERE
		FB.api('/me', {fields: 'first_name'}, function(response) {
			console.log('Welcome, '+response.first_name);
		});
	  }
	}

	function onAuthResponseChange(response) {
	  //console.log('onAuthResponseChange', response);
	}

	function shareToFacebook()
	{
		score = $('#result span').html();
		caption = 'I just scored ' + score + '! Think you can beat me?';
		FB.api('/me', function(response) {
			//Generate picture
			picture = 'http://zindo.info/sportvision/ajax.php?resultToImage='+score+'&FBID='+response.id;
			FB.ui({ method: 'feed',
				caption: caption,
				picture: picture,
				name: 'Checkout my score!',
				link: 'https://apps.facebook.com/'+appID+'/?', //CHANGE YOUR LINK WHEN GO LIVE HERE
			}, function(){
				$.ajax({
					url: "ajax.php",
				  	data: { function: "shareGame", FBID: response.id}
				});					
			});		
		});
	}

})(jQuery);