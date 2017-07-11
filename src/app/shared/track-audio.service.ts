import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SpotifyTrack} from '../models/spotify-track.model';

@Injectable()
export class TrackAudioService {
  audio: HTMLAudioElement = new Audio();

  constructor(private store: Store<fromRoot.AppState>) { }

  play(track: SpotifyTrack){
  	console.log('Inside TrackAudioService.play()');
  	this.audio.src = track.previewUrl;
  	return Observable.create(observer => {
  		console.log('About to call this.audio.play()');
  		//TODO: set up play$ error$ streams to these events, and subscribe to them => call observer.next/error ?
  		this.audio.addEventListener('play', ()=>observer.next(track));
  		this.audio.addEventListener('error', ()=>observer.error(track));
  		this.audio.play();
  	});
  	//this.audio.play(track.previewUrl);
  	//return Observable.fromEvent(this.audio.started?)
  }

  pause(): void{
  	//TODO: reset/stop instead?
  	this.audio.pause();
  }

  _onAudioEnd(): void{
  	//this.store.dispatch(PREVIEW_END);
  }
}
