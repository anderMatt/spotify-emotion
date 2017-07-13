function NoFaceDetectedError(msg){
	this.name = "NoFaceDetectedError";	
	this.message = (msg || "");
	console.log('Inside err constructor. Name is: ' + this.name);
}
NoFaceDetectedError.prototype = Error.prototype;

module.exports = {
	NoFaceDetectedError: NoFaceDetectedError
};
