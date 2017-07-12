import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../store';
import {AnalyzeImageRequestAction} from '../../store/image-analysis.actions';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {ImageAnalyzerService} from '../../shared/image-analyzer.service';

@Component({
  selector: 'app-image-upload',
  template: `
  <div class="btn-toolbar" role="group">
  	<button class="btn btn-primary"><label for="image-input">{{image? 'Use Different Image' : 'Upload Image'}} <i class="fa fa-upload"></i></label>
  	<input (change)="onFileSelect($event)" type="file" id="image-input" accept="image/jpg, image/png" />
  	</button>
  	<button *ngIf="image" class="btn btn-success" (click)="analyzeImage()">Generate Playlist <i class="fa fa-music"></i></button>
  </div>
  <app-image-preview [image]="image"></app-image-preview>

  <!-- IMAGE PREVIEW DETAIL [src]= -->
  `,
  styles: [`
  	.btn{
  		font-size: 1.3em;
  		height: 2em;
  	}
  	.btn-group{
		vertical-align: middle;
		border: 1px solid red;
  	}
  	label{
  		width: 100%;
  		height: 100%;
  		cursor: pointer;
  	}
  	input[type='file']{
  		display: none;
  	}
  `]
})
export class ImageUploadComponent implements OnInit {
  image: string;
  fileReader: FileReader;

  constructor(private imageAnalyzerService: ImageAnalyzerService, private store: Store<fromRoot.AppState>) {
  	this.fileReader = new FileReader();
  	this._initFileReader();
  }

  ngOnInit() {
  }

  _initFileReader(){
  	this.fileReader.onloadend = () => {
      this.image = this.fileReader.result;
  	}
  }
  onFileSelect(event){
  	let file = event.target.files[0];
  	if(file){
  		this.fileReader.readAsDataURL(file);
  	}
  }


  analyzeImage(): void{
    this.store.dispatch(new AnalyzeImageRequestAction(this.image))
  }
}
