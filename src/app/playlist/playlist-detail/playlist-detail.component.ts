import { Component, OnInit, Input } from '@angular/core';
import {SpotifyTrack} from '../../models/spotify-track.model';

@Component({
  selector: 'app-playlist-detail',
  template: `
    <div class="track-info">
    	<div class="list-group-item-heading">{{track.name}}</div>
    	<div class="list-group-item-text">{{track.artist}}</div>
    </div>
    <div class="text-center play pull-right">
      <i class="fa fa-play-circle-o"></i>
    </div>
  `,
  styles: [`
    .list-group-item-heading{
      font-weight: bold;
      font-size: 1.6em;
    }
    .track-info{
      border: 1px solid orange;
      display: inline-block;
      margin-right: 55px;
    }
    .play{
      width: 50px;
      border: 1px solid red;
      box-sizing: border-box;
      font-size: 2em;
      height: 100%;
      border-left: 1px solid grey;
      display: inline-block;
    }
  `]
})
export class PlaylistDetailComponent implements OnInit {

  @Input() track: SpotifyTrack;

  constructor() { }

  ngOnInit() {
  }

}
