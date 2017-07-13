import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';
import {ImageAnalysisResponse} from '../models/image-analysis.model';
import {EmotionProfile} from '../models/emotion-profile.model';

export const ANALYZE_IMAGE_REQUEST = 'ANALYZE_IMAGE_REQUEST';
export const ANALYZE_IMAGE_SUCCESS = 'ANALYZE_IMAGE_SUCCESS';
export const ANALYZE_IMAGE_FAIL = 'ANALYZE_IMAGE_FAIL';

export class AnalyzeImageRequestAction implements Action{
	readonly type = ANALYZE_IMAGE_REQUEST;
	constructor(public payload: string) {}  //base64 or string to analyze
};

export class AnalyzeImageSuccessAction implements Action{
	readonly type = ANALYZE_IMAGE_SUCCESS;
	constructor(public payload: ImageAnalysisResponse){}  //API response as payload.
};

export class AnalyzeImageFailAction implements Action{
	readonly type = ANALYZE_IMAGE_FAIL;
	constructor(public payload: string){}  //message indicating failure reason.
};

export type Actions = AnalyzeImageRequestAction | 
	AnalyzeImageSuccessAction |
	AnalyzeImageFailAction;
