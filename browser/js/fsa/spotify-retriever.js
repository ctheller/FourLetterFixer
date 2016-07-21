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
        var recWrap = function(i){
        return Spotify.getUserPlaylists(id, {limit:50, offset:i})
        .then(function(playlists){
            if (playlists.items.length) {
                return recWrap(i+50)
                .then(function(morePlaylists){
                    return playlists.items.concat(morePlaylists);
                })
            }
            return [];
        }) 
        .catch($log);
        }
        return recWrap(0);
    }

    this.getPlaylistSongs = function(userId, playlistId){
        return Spotify.getPlaylistTracks(userId, playlistId, {market:"US"})
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