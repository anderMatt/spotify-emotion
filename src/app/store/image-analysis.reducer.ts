import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';
import * as ImageAnalysisModel from '../models/image-analysis.model';
import * as imageAnalysis from './image-analysis.actions';

export enum ImageAnalysisStatus{
	success,
	fail,
	loading,
	neutral
};

export interface State{
	image: string,
	topEmotion: string,
	confidenceLevel: number,
	status: ImageAnalysisStatus,
	playlist: [SpotifyTrack]
};

export const initialState: State = {
	image: null,
	topEmotion: null,
	confidenceLevel: null,
	status: ImageAnalysisStatus.neutral,
	playlist: null
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
			console.log('Inside ANALYZE_IMAGE_SUCCESS reducer case');
			return Object.assign({}, state, {
				status: ImageAnalysisStatus.success,
				playlist: action.payload
			});
		case imageAnalysis.ANALYZE_IMAGE_FAIL:
			return Object.assign({}, state, {
				status: ImageAnalysisStatus.fail
			});
		default:
			return state;
	}
}


/******************** SELECTORS ********************/

export const getImage = (state: State) => state.image;
export const getPlaylist = (state: State) => state.playlist;
