app.factory('SpotifyRetriever', function(AuthService, Spotify, $log){

    this.promiseForToken = function(){
        return AuthService.getLoggedInUser()
        .then(function(user){
            if (!Spotify.authToken) Spotify.setAuthToken(user.access_token);
        })
    }

	this.getUserDetails = function(){
    	return Spotify.getCurrentUser()
    	.then(function(userDetails){
        	return userDetails;
    	}) 
        .catch($log);   
	}

    this.getAllPlaylists = function(id){
        return Spotify.getUserPlaylists(id, {limit:50})
        .then(function(playlists){
            return playlists;
        }) 
        .catch($log);   
    }



    return this;
})