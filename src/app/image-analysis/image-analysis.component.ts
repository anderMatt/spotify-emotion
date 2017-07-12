import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-analysis',
  template: `
  <div class="row">
  	<app-image-upload></app-image-upload>
  </div>
  <div class="row">
  	<p>Analysis Top Emotion</p>
  </div>
  `,
  styleUrls: ['./image-analysis.component.css']
})
export class ImageAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
