import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';
import {ImageAnalysis} from '../models/image-analysis.model';


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


/******************** ACTIONS ********************/

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export class UploadImageAction implements Action{
	readonly type = UPLOAD_IMAGE;
	constructor(public payload: string){}  //base64 image uploaded.
};


export const ANALYZE_IMAGE_REQUEST = 'ANALYZE_IMAGE_REQUEST';
export const ANALYZE_IMAGE_SUCCESS = 'ANALYZE_IMAGE_SUCCESS';
export const ANALYZE_IMAGE_FAIL = 'ANALYZE_IMAGE_FAIL';

export class AnalyzeImageRequestAction implements Action{
	readonly type = ANALYZE_IMAGE_REQUEST;
	constructor(public payload: string) {}  //base64 or string to analyze
};

export class AnalyzeImageSuccessAction implements Action{
	readonly type = ANALYZE_IMAGE_SUCCESS;
	constructor(public payload: ImageAnalysis){}  //API response as payload.
};

export class AnalyzeImageFailAction implements Action{
	readonly type = ANALYZE_IMAGE_FAIL;
	constructor(public payload: string){}  //reason as payload?
};

export type Actions = UploadImageAction |
	AnalyzeImageRequestAction |
	AnalyzeImageSuccessAction |
	AnalyzeImageFailAction;


/******************** REDUCER ********************/

export function reducer(state: State, action: Actions): State{
	switch(action.type){
		case UPLOAD_IMAGE:
			return Object.assign({}, state, {
				image: action.payload
			});
		case ANALYZE_IMAGE_REQUEST:
			return Object.assign({}, state, {
				status: ImageAnalysisStatus.loading
			});
		case ANALYZE_IMAGE_SUCCESS:
			return Object.assign({}, state, action.payload, {
				status: ImageAnalysisStatus.success
			});
		case ANALYZE_IMAGE_FAIL:
			return Object.assign({}, state, {
				status: ImageAnalysisStatus.fail
			});

		default:
			return state;
	}
}


/******************** SELECTORS ********************/

export const getImage = (state: State) => state.image;
