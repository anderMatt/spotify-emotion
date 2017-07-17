function NoFaceDetectedError(msg){
	this.name = "NoFaceDetectedError";	
	this.message = (msg || "");
}
NoFaceDetectedError.prototype = Error.prototype;


function SpotifyAccessTokenError(msg){
	this.name = "SpotifyAccessTokenError";
	this.message = (msg || "");
}

SpotifyAccessTokenError.prototype = Error.prototype;

module.exports = {
	NoFaceDetectedError: NoFaceDetectedError,
	SpotifyAccessTokenError: SpotifyAccessTokenError
};
