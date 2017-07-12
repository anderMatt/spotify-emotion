import {SpotifyTrack} from './spotify-track.model';

//Shape of API response
export interface ImageAnalysisResponse{
	topEmotion: string,
	confidenceLevel: number,
	playlist: [SpotifyTrack]
};
