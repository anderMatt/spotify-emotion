import {createSelector} from 'reselect';
import * as imageAnalysis from './image-analysis.reducer';

export interface AppState{
	imageAnalysis: imageAnalysis.State
};


/********** SELECTORS **********/
export const getImageAnalysisState = (state: AppState) => state.imageAnalysis;
export const getImage = createSelector(getImageAnalysisState, imageAnalysis.getImage);
export const getPlaylist = createSelector(getImageAnalysisState, imageAnalysis.getPlaylist);
//Selectors for status, playlist, etc.
