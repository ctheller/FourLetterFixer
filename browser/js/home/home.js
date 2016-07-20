app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('home', function ($rootScope, $scope, SpotifyRetriever) {
    SpotifyRetriever.promiseForToken()
    .then(function(){
    	return SpotifyRetriever.getUserDetails()
    })
    .then(function(userDetails){
        $rootScope.user = userDetails;
    })
    .then(function(){
	    return SpotifyRetriever.getAllPlaylists($scope.user.id)
	})
    .then(function(playlists){
    	$scope.playlists = playlists;
    	console.log("playlists:", playlists)
    })
});