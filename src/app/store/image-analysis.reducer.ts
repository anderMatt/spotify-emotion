import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';
import * as ImageAnalysisModel from '../models/image-analysis.model';
import * as imageAnalysis from './image-analysis.actions';
import {EmotionProfile} from '../models/emotion-profile.model';

export enum ImageAnalysisStatus{
	success,
	fail,
	loading,
	neutral
};

// export interface State{
// 	image: string,
// 	topEmotion: string,
// 	confidenceLevel: number,
// 	status: ImageAnalysisStatus,
// 	playlist: [SpotifyTrack]
// };
export interface State{
	image: string,
	emotionProfile: EmotionProfile,
	status: ImageAnalysisStatus,
	playlist: [SpotifyTrack],
	message: string
};

// export const initialState: State = {
// 	image: null,
// 	topEmotion: null,
// 	confidenceLevel: null,
// 	status: ImageAnalysisStatus.neutral,
// 	playlist: null
// };
export const initialState: State = {
	image: null,
	emotionProfile: {
		topEmotion: null,
		confidenceLevel: null
	},
	status: ImageAnalysisStatus.neutral,
	playlist: null,
	message: ''
};



/******************** REDUCER ********************/

export function reducer(state: State = initialState, action: imageAnalysis.Actions): State {
	switch(action.type){
		case imageAnalysis.ANALYZE_IMAGE_REQUEST:
			return Object.assign({}, state, {
				image: action.payload,
				status: ImageAnalysisStatus.loading
			});
		case imageAnalysis.ANALYZE_IMAGE_SUCCESS:
			return Object.assign({}, state, action.payload, {
				status: ImageAnalysisStatus.success,
			});

		case imageAnalysis.ANALYZE_IMAGE_FAIL:
		console.log('INSIDE ANALYZEIMAGEFAIL case. Msg payload: ' + action.payload);
			return Object.assign({}, state, {
				status: ImageAnalysisStatus.fail,
				message: action.payload
			});
		default:
			return state;
	}
}


/******************** SELECTORS ********************/

export const getImage = (state: State) => state.image;
export const getPlaylist = (state: State) => state.playlist;
