const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	EmotionApi = require('./emotion-api'),
	SpotifyApi = require('./spotify-api'),
	errors = require('./errors'),
	errHandlers = require('./error-handlers');

const request = require('request');

const port = process.env.PORT || 3000;
const EMOTION_API_KEY = process.env.EMOTION_API_KEY;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

//APIs
var emotionApi = new EmotionApi(EMOTION_API_KEY);
var spotifyApi = new SpotifyApi();  


app.post('/api/playlist', function(req, res, next){
	var imageBase64 = req.body.image;
	var response = {};

	emotionApi.generateEmotionProfile(imageBase64)
	.then(emotionProfile => {
		response.emotionProfile = emotionProfile;
		return spotifyApi.generatePlaylistFromEmotion(emotionProfile.topEmotion)
	})
	.then(playlist => {
		response.playlist = playlist 
		return res.status(200).json(response);
	})
	.catch(next);
});

app.use(errHandlers.playlistGenerationErrorHandler);


app.listen(port, function(){
	console.log('Express listening on port: ' + port);
});



