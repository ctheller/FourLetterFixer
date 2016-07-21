'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'spotify']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    // Trigger page refresh when accessing an OAuth route
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });
});

app.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('520d464cc816444a88f7771d3a9ba61c');
  SpotifyProvider.setRedirectUri('http://localhost:1337/auth/spotify/callback');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, Spotify, $log) {

    // //Set Auth Token for App
    // AuthService.getLoggedInUser()
    //     .then(function(user){
    //         if (!Spotify.authToken) Spotify.setAuthToken(user.access_token);
    //     })
    //     .catch($log);

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, $log) {

        // if (!destinationStateRequiresAuth(toState)) {
        //     // The destination state does not require authentication
        //     // Short circuit with return.
        //     return;
        // }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('playlist');
            }
        });

    });

});
