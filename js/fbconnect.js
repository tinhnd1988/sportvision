(function($) {
	$(document).ready(function() {
	  //Change your appID here
	  var appID = 1699249870294264;
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
		  	console.log(response);
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
	    showHome();
	  }
	}

	function onAuthResponseChange(response) {
	  console.log('onAuthResponseChange', response);
	}

})(jQuery);