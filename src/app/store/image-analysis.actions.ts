import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';
import {ImageAnalysis} from '../models/image-analysis.model';

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const ANALYZE_IMAGE_REQUEST = 'ANALYZE_IMAGE_REQUEST';
export const ANALYZE_IMAGE_SUCCESS = 'ANALYZE_IMAGE_SUCCESS';
export const ANALYZE_IMAGE_FAIL = 'ANALYZE_IMAGE_FAIL';

export class UploadImageAction implements Action{
	readonly type = UPLOAD_IMAGE;
	constructor(public payload: string){}  //base64 image to upload
};

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





// 	/******************** ACTIONS ********************/

// export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

// export class UploadImageAction implements Action{
// 	readonly type = UPLOAD_IMAGE;
// 	constructor(public payload: string){}  //base64 image uploaded.
// };


// export const ANALYZE_IMAGE_REQUEST = 'ANALYZE_IMAGE_REQUEST';
// export const ANALYZE_IMAGE_SUCCESS = 'ANALYZE_IMAGE_SUCCESS';
// export const ANALYZE_IMAGE_FAIL = 'ANALYZE_IMAGE_FAIL';

// export class AnalyzeImageRequestAction implements Action{
// 	readonly type = ANALYZE_IMAGE_REQUEST;
// 	constructor(public payload: string) {}  //base64 or string to analyze
// };

// export class AnalyzeImageSuccessAction implements Action{
// 	readonly type = ANALYZE_IMAGE_SUCCESS;
// 	constructor(public payload: ImageAnalysis){}  //API response as payload.
// };

// export class AnalyzeImageFailAction implements Action{
// 	readonly type = ANALYZE_IMAGE_FAIL;
// 	constructor(public payload: string){}  //reason as payload?
// };

// export type Actions = UploadImageAction |
// 	AnalyzeImageRequestAction |
// 	AnalyzeImageSuccessAction |
// 	AnalyzeImageFailAction;
