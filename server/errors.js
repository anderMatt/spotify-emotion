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

function PlaylistRequestError(msg){
	this.name = "PlaylistRequestError";
	this.message = (msg || "");
}

PlaylistRequestError.prototype = Error.prototype;

function ExpiredApiKeyError(msg){
	this.name = "ExpiredApiKeyError";
	this.message = (msg || "");
}

ExpiredApiKeyError.prototype = Error.prototype;

module.exports = {
	NoFaceDetectedError: NoFaceDetectedError,
	SpotifyAccessTokenError: SpotifyAccessTokenError,
	PlaylistRequestError: PlaylistRequestError,
	ExpiredApiKeyError: ExpiredApiKeyError
};
