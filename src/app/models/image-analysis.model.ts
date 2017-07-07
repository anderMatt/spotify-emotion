import {SpotifyTrack} from './spotify-track.model';

//Shape of API response
export interface ImageAnalysis{
	topEmotion: string,
	confidenceLevel: number,
	playlist: [SpotifyTrack]
};
