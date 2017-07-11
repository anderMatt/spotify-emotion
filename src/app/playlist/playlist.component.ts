import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';

import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../store';
import * as trackAudio from '../store/track-audio.actions';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styles: [`
  	:host{
  		text-align: center;
  	}
  	.page_header{
  		font-size: 2.4em;
  	}
  `]
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<[SpotifyTrack]>;
  // activeTrack$: Observable<SpotifyTrack>;
  activeTrack: SpotifyTrack;

  constructor(private store: Store<fromRoot.AppState>) {
  	this.playlist$ = this.store.select(fromRoot.getPlaylist);
    this.store.select(fromRoot.getActiveTrack)
      .subscribe((track: SpotifyTrack) => {
        this.activeTrack = track;
      });
  }

  ngOnInit() {
  }

  playTrackPreview(track: SpotifyTrack): void{
    console.log('Inside playlist.component.playTrackPreview()');
    // this.store.dispatch(new trackAudio.PlayTrackPreviewAction(track));
    this.store.dispatch(new trackAudio.PlayTrackPreviewAction(track));
    //extract previewUrl?
  }

  stopTrackPreview(): void{
    console.log('Inside playlist.component.stopTrackPreview()');
    this.store.dispatch(new trackAudio.StopTrackPreviewAction(null));
  }

}
