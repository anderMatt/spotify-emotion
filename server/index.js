const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	EmotionApi = require('./emotion-api'),
	SpotifyApi = require('./spotify-api');

const request = require('request');

const port = process.env.PORT || 3000;
const EMOTION_API_KEY = require('./emotion-api-key.js'); //TODO: env var.
//const APIkey = process.env.EMOTION_API_KEY
//emotion Api = new EmotionApi(APIKey);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

//APIs
var emotionApi = new EmotionApi(EMOTION_API_KEY);
var spotifyApi = new SpotifyApi();  //gets access token in constructor

//Generate playlist from image
app.post('/api/playlist', function(req, res){   //?image=BASE64STRING
	var imageBase64 = req.body.image;

	emotionApi.generateEmotionProfile(imageBase64)
		.then(emotionProfile => spotifyApi.generatePlaylistFromEmotion(emotionProfile.topEmotion)
			.then(playlist => {
				return res.status(200).json({
					topEmotion: emotionProfile.topEmotion,
					confidenceLevel: emotionProfile.confidenceLevel,
					playlist: playlist
				});
			}));
});



app.post('/api/test', function(req, res){
	console.log('Inside test POST endpoint');
	console.log('Got this data from req.body: ' + req.body.data);
	return res.status(200);
});

app.listen(port, function(){
	console.log('Express listening on port: ' + port);
});



