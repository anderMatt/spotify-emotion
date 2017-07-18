import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-analysis',
  template: `
  <div class="row">
  	<app-image-upload></app-image-upload>
  </div>
  <div class="row">
  	<app-image-analysis-data></app-image-analysis-data>
  </div>
  `
})
export class ImageAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
