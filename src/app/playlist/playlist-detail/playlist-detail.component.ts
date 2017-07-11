import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SpotifyTrack} from '../../models/spotify-track.model';

@Component({
  selector: 'app-playlist-detail',
  template: `
  <div class="row">
    <div class="track-info col-sm-10">
    	<div class="list-group-item-heading">{{track.name}}</div>
    	<div class="list-group-item-text">{{track.artist}}</div>
    </div>
    <div *ngIf="track.previewUrl" (click)="playPreview.emit()" class="text-center play">
      <i class="fa fa-play-circle-o fa-4x"></i>
    </div>
    <div *ngIf="!track.previewUrl" class="no-preview">
      Preview not available.
    </div>
    </div>
  `,
  styles: [`
    .list-group-item-heading{
      font-weight: bold;
      font-size: 1.6em;
    }
    .track-info{
      border: 1px solid orange;
    }
    .play{
      width: 60px;
      border: 1px solid red;
      padding: 5px;
      box-sizing: border-box;
      height: 75px;
      line-height: 3em;
      border-left: 1px solid grey;
      display: inline-block;
      cursor: pointer;
    }

    .play i{
      vertical-align: middle;
    }

    .no-preview{
      color: rgba(0,0,0,0.54);
    }
  `]
})
export class PlaylistDetailComponent implements OnInit {

  @Input() track: SpotifyTrack;
  @Output() playPreview = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
