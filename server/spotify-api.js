'use strict'
const request = require('request'),
	config = require('./config'),
	helpers = require('./helpers');

//TODO: read from envar instead!!!
const key = require('./spotify-api-key');


function SpotifyApi(){
	this.accessToken = null; //
	this.accessTokenStartTime = null;
	this.accessTokenValidDurationMs = null;
}

//TODO: callback to handle errors getting token - pass to this method, and call with (null, body), (err) in request callback
SpotifyApi.prototype._getAccessToken = function(){
	var self = this;
	console.log('Inside _getAccessToken()');
	var endpoint = config.endpoints.spotify.accessToken;
	var credentials = `${key.clientId}:${key.clientSecret}`
	var encodedCredentials = new Buffer(credentials).toString('base64');

	var reqPromise = function(resolve, reject){
		request.post({
			url: endpoint,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${encodedCredentials}`
			},
			json: true,
			body: "grant_type=client_credentials"
		}, function(err, resp, body){
			var success = self._handleAccessTokenResponse(err, resp, body);
			if(success){
				return resolve();
			}
			return reject();
		});
	}
	return new Promise(reqPromise);
};


SpotifyApi.prototype._handleAccessTokenResponse = function(err, resp, body){
	var success = false;

	if(err){
		console.log('SpotifyPOST callback got an err: ' + err);
	}
	else if(resp.statusCode === 200){
		if(body.hasOwnProperty('access_token')){
			console.log('Got this access token from SPotify: ' + body.access_token);
			this.accessToken = body.access_token;
			this.accessTokenValidDurationMs = body.expires_in * 1000;  //in seconds.
			this.accessTokenStartTime = new Date().getTime();
			success = true;
		}
		else{
			console.log('Status code 200, but no token was provided');
			success = false;
		}
	}
	else{
		console.log('SpotifyPOST callback got unexpected status code: ' + resp.statusCode);
	}
	return success;
}

SpotifyApi.prototype.makeApiCall = function(url){
	if(!this.accessToken || this._accessTokenExpired()){
		return this._getAccessToken()
			.then(this._makeApiCall.bind(this, url));
	}
	return this._makeApiCall(url);
}

SpotifyApi.prototype._accessTokenExpired = function(){
	var now = new Date().getTime();
	var expired = (now - this.accessTokenStartTime) > this.accessTokenValidDurationMs;
	console.log('Token expired status: ' + expired);
	return (now - this.accessTokenStartTime) > this.accessTokenValidDurationMs;
}

SpotifyApi.prototype._makeApiCall = function(url){
	var self = this;

	console.log('Inside _makeApiCall');
	var reqPromise = function(resolve, reject){
		request.get({
			url: url,
			headers: {
				'Authorization': `Bearer ${self.accessToken}`
			}
		}, function(err, resp, body){
			if(err){
				console.log('Spotify_makeApiCall will reject with this err: ' + JSON.stringify(err));
				reject(err);
			}
			else if(resp.statusCode === 200){
				var data = JSON.parse(body);
				//Will this array have len 0 is no tracks are found from the genre seeds?
				var serializedTracks = self._serializeTracks(data.tracks);
				resolve(serializedTracks);
				//Response reference: https://developer.spotify.com/web-api/get-recommendations/
			}
			else{
				console.log('Spotify_makeAPiCall will reject, with this unexpected status code: ' + resp.statusCode);
				console.log(JSON.stringify(body));
				reject(resp.statusCode);
			}
		});
	}
	return new Promise(reqPromise);
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

	// return this._makeApiCall(url);
	return this.makeApiCall(url);
};


///////FOR TESTING
module.exports = SpotifyApi;
// var api = new SpotifyApi();
