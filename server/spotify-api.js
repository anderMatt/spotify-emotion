'use strict'
const request = require('request-promise-native'),
	config = require('./config'),
	helpers = require('./helpers'),
	errors = require('./errors');

//TODO: read from envar instead!!!
const key = require('./spotify-api-key');


function SpotifyApi(){
	this.accessToken = null; //
	this.accessTokenStartTime = null;
	this.accessTokenValidDurationMs = null;
}

SpotifyApi.prototype._getAccessToken = function(){
	var self = this;

	var endpoint = config.endpoints.spotify.accessToken;
	var credentials = `${key.clientId}:${key.clientSecret}`
	var encodedCredentials = new Buffer(credentials).toString('base64');

	var opts = {
		url: endpoint,
		method: 'POST',
		json: true,
		body: "grant_type=client_credentials",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${encodedCredentials}`
		}
	};

	return request(opts)
		.then(resp =>self._handleAccessTokenResponse(resp) )

};

SpotifyApi.prototype._handleAccessTokenResponse = function(response){
	var token = response.access_token;
	if(!token){
		return Promise.reject(new errors.SpotifyAccessTokenError());
	}
	this.accessToken = token;
	this.accessTokenValidDurationMs = (response.expires_in * 1000)
	this.accessTokenStartTime = new Date().getTime();
	return Promise.resolve();
};


SpotifyApi.prototype.makeApiCall = function(url){
	if(!this.accessToken || this._accessTokenExpired()){
		return this._getAccessToken()
			.then(this._makeApiCall.bind(this, url));
	}
	return this._makeApiCall(url);
};

SpotifyApi.prototype._accessTokenExpired = function(){
	var now = new Date().getTime();
	var expired = (now - this.accessTokenStartTime) > this.accessTokenValidDurationMs;
	return (now - this.accessTokenStartTime) > this.accessTokenValidDurationMs;
};

SpotifyApi.prototype._makeApiCall = function(url){
	var self = this;

	var opts = {
		url: url,
		headers: {
			'Authorization': `Bearer ${self.accessToken}`
		}
	};

	return request(opts)
		.then(response => {
			let tracks = JSON.parse(response).tracks;
			return self._serializeTracks(tracks);
		})
		.catch(err => {
			return Promise.reject(new errors.PlaylistRequestError());
		});
};

SpotifyApi.prototype._serializeTracks = function(spotifyTracks){
	return spotifyTracks.reduce((accumulator, track) => {
		let serializedTrack = helpers.trackToJson(track);
		accumulator.push(serializedTrack);
		return accumulator;
	}, []);
};

SpotifyApi.prototype.generatePlaylistFromEmotion = function(emotion){
	console.log('Inside Api#generatePlaylistFromEmotion. Passed this emotion: ' + emotion);
	var genres = config.genresByEmotion[emotion];
	var url = `${config.endpoints.spotify.recommendations}?seed_genres=${genres.join(',')}&limit=${config.trackLimit}`;

	return this.makeApiCall(url);
};


module.exports = SpotifyApi;
