app.factory('SpotifyRetriever', function(AuthService, Spotify, $log){

    // this.promiseForToken = function(){
    //     return AuthService.getLoggedInUser()
    //     .then(function(user){
    //         if (!Spotify.authToken) Spotify.setAuthToken(user.access_token);
    //     })
    // }

    //Gets User Info
	this.getUserDetails = function(){
    	return Spotify.getCurrentUser()
    	.then(function(userDetails){
        	return userDetails;
    	}) 
        .catch($log);   
	}

    //Retrieves ALL of a user's public, private, and followed playlists
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

    //Retrieves ALL songs from a given playlist
    this.getPlaylistSongs = function(userId, playlistId){
        var recWrap = function(i){
            return Spotify.getPlaylistTracks(userId, playlistId, {market:"US", offset:i})
            .then(function(songs){
                var songList = songs.items;
                songList = songList.map(function(item){
                    return item.track;
                })
                if (songList.length) {
                    return recWrap(i+100)
                    .then(function(moreSongs){
                        return songList.concat(moreSongs);
                    })
                }
                return [];
            })
            .catch($log);
        }
        return recWrap(0);
    }

    //Creates a new playlist without the explicit tracks
    this.makeCleanPlaylist = function(userId, name, songs){
        var cleanSongArray = songs.filter(function(song){
            return !song.explicit;
        })
        var cleanSongIdArray = cleanSongArray.map(function(song){
            return song.id;
        })
        return Spotify.createPlaylist(userId, {name: name+" 🙉", public: false})
        .then(function(createdPlaylist){
            return Spotify.addPlaylistTracks(userId,createdPlaylist.id,cleanSongIdArray);
        })
        .then(function(createdPlaylistWithTracks){
            return createdPlaylistWithTracks;
        })
        .catch($log);
    }

    // Spotify.removePlaylistTracks('user_id', 'playlist_id', 'comma separated string or array of spotify track ids or uris');
    // Spotify.addPlaylistTracks('user_id', 'playlist_id', 'comma separated string or array of spotify track uris');
    // Spotify.createPlaylist('user_id', {name:'', public: false});


    return this;
})