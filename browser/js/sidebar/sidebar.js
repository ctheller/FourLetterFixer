'use strict';

app.controller('SidebarCtrl', function ($rootScope, $scope, SpotifyRetriever) {

	$rootScope.$on('$stateChangeStart', function (event) {
        SpotifyRetriever.getUserDetails()
        .then(function(userDetails){
            $rootScope.user = userDetails;
        })
        .then(function(){
    			return SpotifyRetriever.getAllPlaylists($scope.user.id)
    		})
        .then(function(playlists){
        	$rootScope.playlists = playlists;
        })
	})


});
