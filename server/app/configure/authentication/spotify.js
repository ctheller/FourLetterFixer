'use strict';
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var spotifyConfig = app.getValue('env').SPOTIFY;

    var spotifyCredentials = {
        clientID: spotifyConfig.clientID,
        clientSecret: spotifyConfig.clientSecret,
        callbackURL: "http://localhost:1337/auth/spotify/callback"
        //spotifyConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        console.log("Profile from Spotify:", profile);
        User.findOne({
                where: {
                    spotify_id: profile.id
                }
            })
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        spotify_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from spotify authentication', err);
                done(err);
            })

    };

    passport.use(new SpotifyStrategy(spotifyCredentials, verifyCallback));

    app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['user-read-email', 'playlist-read-private', 'playlist-modify-private', 'user-read-private'] }));

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify'),
        function (req, res) {
            res.redirect('/');
        });

};
