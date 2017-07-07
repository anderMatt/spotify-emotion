var trackToJson = function(spotifyTrack){
	var artist = spotifyTrack.artists[0].name;
	return {
		name: spotifyTrack.name,
		artist: artist,
		previewUrl: spotifyTrack.preview_url
	};
};

module.exports = {
	trackToJson: trackToJson
};