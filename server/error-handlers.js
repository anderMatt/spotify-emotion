const errors = require('./errors');

function playlistGenerationErrorHandler(err, req, res, next){
	var message = '';

	if(err.name === 'NoFaceDetectedError'){
		message = 'No faces were detected in the image';
	}

	else{
		message = 'Sorry, there was a problem generating a playlist!';
	}

	return res.status(200).json({
		playlist: [],
		emotionProfile: {},
		message: message
	});
}

//function(err, req, res, next){
	//catch-all handler
//}

module.exports = {
	playlistGenerationErrorHandler: playlistGenerationErrorHandler
};