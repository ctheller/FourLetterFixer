app.config(function ($stateProvider) {
    $stateProvider.state('playlist', {
        url: '/playlist/:ownerId/:playlistId/:playlistName',
        templateUrl: 'js/playlist/playlist.html',
        data: {
            authenticate: true
        }
    });
});

app.controller('playlist', function ($rootScope, $scope, SpotifyRetriever, Spotify, $stateParams, $state) {

    SpotifyRetriever.getPlaylistSongs($stateParams.ownerId, $stateParams.playlistId)
    .then(function(songs){
        $scope.songs = songs;
        return songs;
    })

    $scope.makeCleanPlaylist = function(){
        SpotifyRetriever.makeCleanPlaylist($scope.user.id, $stateParams.playlistName, $scope.songs)
        .then(function(data){
            $state.go('playlist', {ownerId:data.owner.id, playlistId:data.id, playlistName: data.name});
            //FIGURE THIS OUT. gaaaaaaaah digests #yuck
           // $rootScope.$apply();
        });
    }
});