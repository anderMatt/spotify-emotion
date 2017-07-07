const config = {
	endpoints: {
		spotify: {
			accessToken: "https://accounts.spotify.com/api/token",
			recommendations: "https://api.spotify.com/v1/recommendations"
			//GET with seeds
		}
	},

	genresByEmotion: {
		'anger': ['metal', 'metalcore', 'black-metal'],
		'happiness': ['techno', 'pop', 'dance', 'hardcore'],
		'sadness': ['sad', 'rainy-day'],
		'neutral': ['piano', 'classical', 'jazz', 'study']
	}
};

module.exports = config;