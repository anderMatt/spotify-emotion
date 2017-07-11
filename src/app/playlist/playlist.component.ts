import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';

import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../store';

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

  constructor(private store: Store<fromRoot.AppState>) {
  	this.playlist$ = this.store.select(fromRoot.getPlaylist);
  }

  ngOnInit() {
  }

  playTrackPreview(track: SpotifyTrack): void{
    console.log('Inside playlist.component.playTrackPreview()');
    //extract previewUrl?
  }

}
