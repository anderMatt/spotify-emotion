import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
	<div class="jumbotron text-center">
		<h3>Generate a Spotify playlist from a picture of your face!</h3>
		Your facial expression is analyzed to detect which emotion is most prevalent: <span class="emotions"> Anger, Happiness, Saddness, or Neutral Expression. </span>
		A sample Spotify playlist is generated from music genres that evoke the detected emotion.
	</div>
  `,
  styles: [`
  	.jumbotron{
  		font-size: 1.2em;
  		text-align: center;
  	}
  	h3{
  		margin-bottom: 15px;
  	}
  	.emotions{
  		font-weight: bold;
  		font-size: 1.1em;
  	}
  `]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
