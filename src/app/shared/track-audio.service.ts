import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import * as trackAudio from '../store/track-audio.actions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SpotifyTrack} from '../models/spotify-track.model';

@Injectable()
export class TrackAudioService {
  audio: HTMLAudioElement;

  constructor(private store: Store<fromRoot.AppState>) { 
  	this.audio = new Audio();
  	this.audio.onended = this._onAudioEnd.bind(this);
  	//TODO: this context ok?
  }

  play(track: SpotifyTrack){
  	console.log('Inside TrackAudioService.play()');
  	this.audio.src = track.previewUrl;
  	return Observable.create(observer => {
  		console.log('About to call this.audio.play()');
  		this.audio.onplay = () => observer.next(track);
  		this.audio.onerror = () => observer.error(track);

  		this.audio.play();
  	});
  	//this.audio.play(track.previewUrl);
  	//return Observable.fromEvent(this.audio.started?)
  }

  stop(): void{
  	//TODO: reset/stop instead?
  	this.audio.pause();
  }

  _onAudioEnd(): void{
  	console.log('Inside _onAudioEnd()');
  	this.store.dispatch(new trackAudio.TrackPreviewEndedAction(null));
  	//this.store.dispatch(PREVIEW_END);
  }
}
