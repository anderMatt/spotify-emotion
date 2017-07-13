const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	EmotionApi = require('./emotion-api'),
	SpotifyApi = require('./spotify-api'),
	errors = require('./errors');

const request = require('request');

const port = process.env.PORT || 3000;
const EMOTION_API_KEY = require('./emotion-api-key.js'); //TODO: env var.
//const APIkey = process.env.EMOTION_API_KEY
//emotion Api = new EmotionApi(APIKey);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

//APIs
var emotionApi = new EmotionApi(EMOTION_API_KEY);
var spotifyApi = new SpotifyApi();  


app.post('/api/playlist', function(req, res){
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
	.catch(err => {
		if(err instanceof errors.NoFaceDetectedError){
			console.log('Catching no face error');
			return res.status(200).json({
				playlist: [],
				emotionProfile: {},
				message: 'No faces were detected in the image'
				//emotionProfile
			});
		}
	})
})

app.post('/api/test', function(req, res){
	console.log('Inside test POST endpoint');
	console.log('Got this data from req.body: ' + req.body.data);
	return res.status(200);
});

app.listen(port, function(){
	console.log('Express listening on port: ' + port);
});



