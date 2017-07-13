import {createSelector} from 'reselect';
import {ActionReducer} from '@ngrx/store';
import {combineReducers} from '@ngrx/store';
import * as imageAnalysis from './image-analysis.reducer';
import * as trackAudio from './track-audio.reducer';

//Top level application state.
export interface AppState{
	imageAnalysis: imageAnalysis.State,
	trackAudio: trackAudio.State
};

const reducers = {
	imageAnalysis: imageAnalysis.reducer,
	trackAudio: trackAudio.reducer
};

export function reducer(state: any, action: any){
	return combineReducers(reducers)(state, action);
}


/********** SELECTORS **********/
export const getImageAnalysisState = (state: AppState) => state.imageAnalysis;
export const getImage = createSelector(getImageAnalysisState, imageAnalysis.getImage);
export const getPlaylist = createSelector(getImageAnalysisState, imageAnalysis.getPlaylist);
export const getAnalysisLoadingStatus = createSelector(getImageAnalysisState, (state: imageAnalysis.State) => state.status);

export const getEmotionProfile = createSelector(getImageAnalysisState, (state: imageAnalysis.State) => state.emotionProfile);
export const getMessage = createSelector(getImageAnalysisState, (state: imageAnalysis.State) => state.message);
//Selectors for status, playlist, etc.

export const getTrackAudioState = (state: AppState) => state.trackAudio;
export const getActiveTrack = createSelector(getTrackAudioState, trackAudio.getActiveTrack);
export const getAudioStatus = createSelector(getTrackAudioState, trackAudio.getStatus);
