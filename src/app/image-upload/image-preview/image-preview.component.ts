import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  template: `
  <div class="preview">
  	<!-- <img *ngIf="image" class="img-responsive" [src]="image"> -->
  </div>
  `,
  styles: [`
  	.preview{
  		margin-top: 15px;
  		padding: 10px;
  		min-height: 200px;
  		max-width: 500px;
  		background-color: #d9d9d9;
  	}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewComponent implements OnInit {
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
