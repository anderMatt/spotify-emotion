import * as track from './track-audio.actions';
import {SpotifyTrack} from '../models/spotify-track.model';

export enum TrackAudioStatus{
	playing,
	notPlaying
};

export interface State{
	status: TrackAudioStatus,
	activeTrack: SpotifyTrack
};

export const initialState: State = {
	status: TrackAudioStatus.notPlaying,
	activeTrack: null
};


/******************** REDUCER ********************/

export function reducer(state: State = initialState, action: track.Actions): State{
	switch(action.type){
		//track.PLAY_TRACK_PREVIEW not needed, since intercepted by an effect, which dispatches TRACK_PREVIEW_STATED

		case track.TRACK_PREVIEW_STARTED:
			return Object.assign({}, state, {
				status: TrackAudioStatus.playing,
				activeTrack: action.payload
			});
		case track.TRACK_PREVIEW_ENDED:
			return Object.assign({}, state, {
				status: TrackAudioStatus.notPlaying,
				activeTrack: null
			});
		default:
			return state;
	}	
}

/******************** SELECTORS ********************/

export const getActiveTrack = (state: State) => state.activeTrack;
export const getStatus = (state: State) => state.status;
