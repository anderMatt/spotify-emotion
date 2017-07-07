'use strict'
const request = require('request'),
	config = require('./config'),
	helpers = require('./helpers');

//TODO: read from envar instead!!!
const key = require('./spotify-api-key');


function SpotifyApi(){
	this.accessToken = null; //

	//TODO: put this call in _makeApiRequest
	this._getAccessToken();
}

//TODO: callback to handle errors getting token - pass to this method, and call with (null, body), (err) in request callback
SpotifyApi.prototype._getAccessToken = function(){
	var endpoint = config.endpoints.spotify.accessToken;
	var credentials = `${key.clientId}:${key.clientSecret}`
	var encodedCredentials = new Buffer(credentials).toString('base64');

	request.post({
		url: endpoint,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${encodedCredentials}`
		},
		json: true,
		body: "grant_type=client_credentials"
	}, this._handleAccessTokenResponse.bind(this));
};


SpotifyApi.prototype._handleAccessTokenResponse = function(err, resp, body){
	if(err){
		console.log('SpotifyPOST callback got an err: ' + err);
	}
	else if(resp.statusCode === 200){
		if(body.hasOwnProperty('access_token')){
			console.log('Got this access token from SPotify: ' + body.access_token);
			this.accessToken = body.access_token;
		}
	}
	else{
		console.log('SpotifyPOST callback got unexpected status code: ' + resp.statusCode);
	}
}

SpotifyApi.prototype._makeApiCall = function(url){
	var self = this;

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
				var serializedTracks = data.tracks.reduce((accumulator, track) => {
					let serializedTrack = helpers.trackToJson(track);
					accumulator.push(serializedTrack);
					return accumulator;
				}, []);

				resolve(serializedTracks);
				//Response reference: https://developer.spotify.com/web-api/get-recommendations/
			}
			else{
				console.log('Spotify_makeAPiCall will reject, with this unexpected status code: ' + resp.statusCode);
				reject(resp.statusCode);
			}
		});
	}
	return new Promise(reqPromise);
};

SpotifyApi.prototype.generatePlaylistFromEmotion = function(emotion){
	console.log('Inside Api#generatePlaylistFromEmotion. Passed this emotion: ' + emotion);
	var genres = config.genresByEmotion[emotion];
	var url = `${config.endpoints.spotify.recommendations}?seed_genres=${genres.join(',')}`;

	return this._makeApiCall(url);
};


///////FOR TESTING
module.exports = SpotifyApi;
// var api = new SpotifyApi();
