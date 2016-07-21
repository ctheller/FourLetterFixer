app.config(function ($stateProvider) {
    $stateProvider.state('playlist', {
        url: '/playlist/:ownerId/:playlistId',
        templateUrl: 'js/playlist/playlist.html'
    });
});

app.controller('playlist', function ($rootScope, $scope, SpotifyRetriever, Spotify, $stateParams) {
    // SpotifyRetriever.promiseForToken()
    // .then(function(){
    // 	return SpotifyRetriever.getUserDetails()
    // })
 //    SpotifyRetriever.getUserDetails()
 //    .then(function(userDetails){
 //        $rootScope.user = userDetails;
 //    })
 //    .then(function(){
	//     return SpotifyRetriever.getAllPlaylists($scope.user.id)
	// })
 //    .then(function(playlists){
 //    	return $scope.playlists = playlists;
 //    })
    // .then(function(playlists){
    //     return SpotifyRetriever.getPlaylistSongs($scope.user.id, $scope.playlists[2].id);
    // })
    SpotifyRetriever.getPlaylistSongs($stateParams.ownerId, $stateParams.playlistId)
    .then(function(songs){
        $scope.songs = songs;
        return songs;
    })

    // Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
    //     console.log("Get Track:",data);
    // });

    // Spotify.getTrackAudioFeatures('0eGsygTp906u18L0Oimnem').then(function (data) {
    //     console.log("Get Features:",data);
    // });
});