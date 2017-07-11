import {Action} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';

export const PLAY_TRACK_PREVIEW = 'PLAY_TRACK_PREVIEW';
export const STOP_TRACK_PREVIEW = 'STOP_TRACK_PREVIEW';

export const TRACK_PREVIEW_STARTED = 'TRACK_PREVIEW_STARTED';
export const TRACK_PREVIEW_ENDED = 'TRACK_PREVIEW_ENDED';

export class PlayTrackPreviewAction implements Action{
	readonly type = PLAY_TRACK_PREVIEW;
	constructor(public payload: SpotifyTrack){}  //URL of track preview sound file.
}

export class StopTrackPreviewAction implements Action{
	readonly type = STOP_TRACK_PREVIEW;
	constructor(public payload: any){}
}

export class TrackPreviewStartedAction implements Action{
	readonly type = TRACK_PREVIEW_STARTED;
	constructor(public payload: SpotifyTrack){}  //name of track being started.
}

export class TrackPreviewEndedAction implements Action{
	readonly type = TRACK_PREVIEW_ENDED;
	constructor(public payload: any){}  //TODO: need to pass a payload?
}

export type Actions = PlayTrackPreviewAction |
	StopTrackPreviewAction |
	TrackPreviewStartedAction |
	TrackPreviewEndedAction;