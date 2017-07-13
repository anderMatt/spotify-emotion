import {SpotifyTrack} from './spotify-track.model';
import {EmotionProfile} from './emotion-profile.model';

//Shape of API response
// export interface ImageAnalysisResponse{
// 	topEmotion: string,
// 	confidenceLevel: number,
// 	playlist: [SpotifyTrack],
// 	message?: string
// };
export interface ImageAnalysisResponse{
	emotionProfile: EmotionProfile,
	playlist: [SpotifyTrack],
	message?: string
};
