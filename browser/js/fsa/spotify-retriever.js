app.factory('SpotifyRetriever', function(AuthService, Spotify, $log){

    // this.promiseForToken = function(){
    //     return AuthService.getLoggedInUser()
    //     .then(function(user){
    //         if (!Spotify.authToken) Spotify.setAuthToken(user.access_token);
    //     })
    // }

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
            return playlists.items;
        }) 
        .catch($log);   
    }

    this.getPlaylistSongs = function(userId, playlistId){
        return Spotify.getPlaylistTracks(userId, playlistId)
        .then(function(songs){
            var songList = songs.items;
            songList = songList.map(function(item){
                return item.track;
            })
            return songList;
        })
    }

    return this;
})