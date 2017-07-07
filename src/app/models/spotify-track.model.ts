export interface ImageAnalysis{
	topEmotion: string,
	playlist: [SpotifyTrack]
};


//Shape of track's retrieved from Spotify API.
export interface SpotifyTrack{
	name: string,
	artist: string,
	previewUrl?: string
};