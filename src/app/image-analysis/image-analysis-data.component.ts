import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../store';

@Component({
  selector: 'app-image-analysis-data',
  template: `
  <div *ngIf="imageAnalysisData">
  <p>Top Emotion: {{imageAnalysisData.topEmotion | capitalize}}</p>
  <p>Confidence Level: {{imageAnalysisData.confidenceLevel | percent:'1.0-2'}}</p>
  </div>
  `
})
export class ImageAnalysisDataComponent implements OnInit {

  imageAnalysisData: any;

  constructor(private store: Store<fromRoot.AppState>) {
  	//
  this.store.select(fromRoot.getImageAnalysisData)
  		.subscribe(data => {
  			this.imageAnalysisData = data
  		});
  }

  ngOnInit() {
  }

}
