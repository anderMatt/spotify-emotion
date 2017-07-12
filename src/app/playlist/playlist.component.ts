import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {SpotifyTrack} from '../models/spotify-track.model';

import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../store';
import {ImageAnalysisStatus} from '../store/image-analysis.reducer';
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
    .playlist{
      position: relative;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .loading{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.50);
    }
  `]
})
export class PlaylistComponent implements OnInit {
  playlist$: Observable<[SpotifyTrack]>;
  activeTrack$: Observable<SpotifyTrack>;
  loading$: Observable<ImageAnalysisStatus>;

  constructor(private store: Store<fromRoot.AppState>) {
  	this.playlist$ = this.store.select(fromRoot.getPlaylist);
    this.loading$ = this.store.select(fromRoot.getAnalysisLoadingStatus);
    this.activeTrack$ = this.store.select(fromRoot.getActiveTrack);
  }

  ngOnInit() {
  }

  playTrackPreview(track: SpotifyTrack): void{
    this.store.dispatch(new trackAudio.PlayTrackPreviewAction(track));
  }

  stopTrackPreview(): void{
    this.store.dispatch(new trackAudio.StopTrackPreviewAction(null));
  }

}
