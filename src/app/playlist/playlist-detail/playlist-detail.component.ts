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
    <div *ngIf="track.previewUrl" (click)="onTrackControlClick()" class="text-center track-control">
      <i *ngIf="!isPlaying" class="fa fa-play-circle-o fa-4x play"></i>
      <i *ngIf="isPlaying" class="fa fa-pause-circle-o fa-4x pause"></i>
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
    .track-control{
      width: 60px;
      padding: 5px;
      box-sizing: border-box;
      height: 75px;
      line-height: 3em;
      display: inline-block;
      cursor: pointer;
    }

    .track-control i{
      vertical-align: middle;
    }

    .track-control i:hover{
      transform: scale(1.2, 1.2);
    }

    .play:hover{
      color: green;
    }

    .pause{
      color: red;
    }

    .no-preview{
      color: rgba(0,0,0,0.54);
    }
  `]
})
export class PlaylistDetailComponent implements OnInit {

  @Input() track: SpotifyTrack;
  @Input() isPlaying: boolean;

  @Output() playPreview = new EventEmitter();
  @Output() stopPreview = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTrackControlClick(event): void{
    if(this.isPlaying){
      this.stopPreview.emit();
    }
    else{
      this.playPreview.emit();
    }
  }
}
