import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../store';

@Component({
  selector: 'app-image-analysis-data',
  template: `
  <p>ImageAnalysisData component!</p>
  <div>
  JSON HERE: {{imageAnalysisData | json}}
  </div>
  <div>
  </div>
  `
})
export class ImageAnalysisDataComponent implements OnInit {

  imageAnalysisData: any;

  constructor(private store: Store<fromRoot.AppState>) {
  	//
  this.store.select(fromRoot.getImageAnalysisData)
  		.subscribe(data => {
  			console.log('Inside IADA store subscription');
  			this.imageAnalysisData = data
  		});
  }

  ngOnInit() {
  }

}
