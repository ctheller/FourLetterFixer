app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('home', function ($rootScope, $scope, SpotifyRetriever, Spotify) {
    // SpotifyRetriever.promiseForToken()
    // .then(function(){
    // 	return SpotifyRetriever.getUserDetails()
    // })
    SpotifyRetriever.getUserDetails()
    .then(function(userDetails){
        $rootScope.user = userDetails;
    })
    .then(function(){
	    return SpotifyRetriever.getAllPlaylists($scope.user.id)
	})
    .then(function(playlists){
    	return $scope.playlists = playlists;
    })
    .then(function(playlists){
        return SpotifyRetriever.getPlaylistSongs($scope.user.id, playlists[2].id);
    })
    .then(function(songs){
        $scope.songs = songs;
        console.log("songlist:", songs);
        return songs;
    })

    Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
        console.log("Get Track:",data);
    });

    Spotify.getTrackAudioFeatures('0eGsygTp906u18L0Oimnem').then(function (data) {
        console.log("Get Features:",data);
    });
});