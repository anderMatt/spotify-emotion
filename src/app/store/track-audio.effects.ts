import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/catch';

import {TrackAudioService} from '../shared/track-audio.service';
import {SpotifyTrack} from '../models/spotify-track.model';
import * as trackAudio from './track-audio.actions';

@Injectable()
export class TrackAudioEffects{
	@Effect()
	playTrackAudio$: Observable<Action> = this.actions$
		.ofType(trackAudio.PLAY_TRACK_PREVIEW)
		.map((action: trackAudio.Actions) => action.payload)
		.switchMap((track: SpotifyTrack) => this.trackAudioService.play(track)
			.map((track: SpotifyTrack) => new trackAudio.TrackPreviewStartedAction(track))
			//TODO: TrackPreviewFailedAction
		);
		//TODO: .catch() audio fail? => new TrackPreviewFailedAction()


	@Effect()
	stopTrackAudio$: Observable<Action> = this.actions$
		.ofType(trackAudio.STOP_TRACK_PREVIEW)
		.do(() => this.trackAudioService.stop())
		.map(() => new trackAudio.TrackPreviewEndedAction(null));

	constructor(private actions$: Actions, private trackAudioService: TrackAudioService){}
}