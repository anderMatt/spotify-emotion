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
		.do(() => console.log('inside playTrackAudio$ effects chain'))
		.map((action: trackAudio.Actions) => action.payload)
		// .do((track: SpotifyTrack) => this.trackAudioService.play(track))
		.switchMap((track: SpotifyTrack) => this.trackAudioService.play(track)
			.map((track: SpotifyTrack) => new trackAudio.TrackPreviewStartedAction(track))
			//TODO: TrackPreviewFailedAction
		);
		//TODO: .catch() audio fail? => new TrackPreviewFailedAction()

	constructor(private actions$: Actions, private trackAudioService: TrackAudioService){}
}