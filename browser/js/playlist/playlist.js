app.config(function ($stateProvider) {
    $stateProvider.state('playlist', {
        url: '/playlist/:ownerId/:playlistId/:playlistName',
        templateUrl: 'js/playlist/playlist.html'
    });
});

app.controller('playlist', function ($rootScope, $scope, SpotifyRetriever, Spotify, $stateParams) {

    SpotifyRetriever.getPlaylistSongs($stateParams.ownerId, $stateParams.playlistId)
    .then(function(songs){
        $scope.songs = songs;
        return songs;
    })

    $scope.makeCleanPlaylist = function(){
        SpotifyRetriever.makeCleanPlaylist($scope.user.id, $stateParams.playlistName, $scope.songs)
        .then(function(data){
            //FIGURE THIS OUT. gaaaaaaaah digests #yuck
            $rootScope.$apply();
        });
    }
});