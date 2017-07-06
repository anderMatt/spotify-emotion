'use strict'

//API REFERENCE:    https://westus.dev.cognitive.microsoft.com/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa

const request = require('request');

/**
 * @class
 * @classdesc Provides access to Microsoft's Cognitive Emotion API.
 * 
 * @param {String} apiKey: Personal API key to enable http calls.
 */
function EmotionApi(apiKey){
	this.apiKey = apiKey;
	this.endpoint = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize";
}

EmotionApi.prototype._makeApiCall = function(imageBlob){
	console.log('Inside EmotionApi#_makeApiCall(): ');
	var self = this;

	var reqPromise = function(resolve, reject){
		request
		.post({
			url: self.endpoint,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key': self.apiKey
			},
			body: imageBlob //binary blob of image
			// json: {
			// 	url: imageurl
			// }
		}, function(err, resp, body){
			if(err){
				console.log('Got this ERR in api call: ' + JSON.stringify(err));
				reject(err);
			}
			else if(!err && resp.statusCode === 200){
				var data = JSON.parse(body);
				resolve(data);
			}
			else{
				console.log('Got unexpected status code from microsoft api: ' + resp.statusCode);
				reject({'Unexpected status code': resp.statusCode});
			}
		});
	}
	return new Promise(reqPromise);
};

EmotionApi.prototype._getRelevantEmotionScores = function(allEmotionScores){
	console.log('Inside _getRelevantEmotionScores. Passed all scores: ' + JSON.stringify(allEmotionScores));
	var relevantEmotions = [
		"happiness",
		"anger",
		"neutral",
		"sadness"
		//fear?
	];
	var emotionScores = relevantEmotions.reduce((scores, emotion) => {
		scores[emotion] = allEmotionScores[emotion];
		return scores;
	}, {});

	console.log('The relevant emotion scores: ' + JSON.stringify(emotionScores));
	return emotionScores;
};

//Parse most relevant emotion from API response, among the emotions we care about.
EmotionApi.prototype._parseEmotionFromResponse = function(apiResponse){
	if(apiResponse.length === 0){
		//No face was detected
		console.log('APIresponse length is 0. No faces detected.');
		// return Promise.resolve(null);
		return Promise.resolve(null);
	}
	//get emotion with highest score.
	//FOR NOW: only first face
	var allEmotionScores = apiResponse[0].scores;
	var relevantEmotionScores = this._getRelevantEmotionScores(allEmotionScores);
	var mostPrevalentEmotion = Object.keys(relevantEmotionScores).reduce((a,b) => {
		return relevantEmotionScores[a] > relevantEmotionScores[b] ? a : b;
	});

	return Promise.resolve(mostPrevalentEmotion);
};

EmotionApi.prototype.generateEmotionProfile = function(imageBase64){
	var raw = imageBase64.split(',')[1];
	var imageBlob = new Buffer(raw, 'base64');
	return this._makeApiCall(imageBlob)
		.then(this._parseEmotionFromResponse.bind(this))
};


module.exports = EmotionApi;