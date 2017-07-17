const errors = require('./errors');

function playlistGenerationErrorHandler(err, req, res, next){
	var message = '';
	if(err instanceof errors.NoFaceDetectedError){
		message = 'No faces were detected in the image';
	}

	//else if emptyPlaylist
	//else{ next(err) }

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