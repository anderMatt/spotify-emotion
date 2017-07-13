import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../store';

@Component({
  selector: 'app-image-analysis-data',
  template: `
  <div *ngIf="emotionProfile.topEmotion" class="data">
  <p>Detected Emotion: <span>{{emotionProfile.topEmotion | capitalize}}</span></p>
  <p>Confidence Level: <span>{{emotionProfile.confidenceLevel | percent:'1.0-2'}}</span></p>
  </div>
  `,
  styles: [`
    .data{
      padding: 15px;
      border: 2px solid rgba(0,0,0,0.5);
      display: inline-block;
      margin-top: 15px;
      font-size: 1.4em;
    }
    .data span{
      font-weight: bold;
    }
  `]
})
export class ImageAnalysisDataComponent implements OnInit {

  emotionProfile: any;

  constructor(private store: Store<fromRoot.AppState>) {
  	//
  this.store.select(fromRoot.getEmotionProfile)
  		.subscribe(profile => {
  			this.emotionProfile = profile
  		});
  }

  ngOnInit() {
  }

}
