import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
	<div class="jumbotron text-center">
		<h3>Generate a Spotify playlist from a picture of your face!</h3>
    <p>
    Facial expressions in your photo are analyzed to detect which of the following emotions is most prevalent: <span class="emotions"> Anger, Happiness, Sadness, or Neutral Expression. </span>
		A sample Spotify playlist is then generated from music genres that evoke the detected emotion. Try it out!
    </p>
	</div>
  `,
  styles: [`
  	.jumbotron{
  		font-size: 1.1em;
  		text-align: center;
      background-color: #004080;
      color: white;
  	}
  	.jumbotron h3{
  		margin-bottom: 25px;
      font-size: 1.5em;
      border-bottom: 1px solid white;
      padding-left: 25px;
      padding-right: 25px;
      padding-bottom: 10px;
      display: inline-block;
  	}
  	.emotions{
      display: block;
  		font-weight: bold;
  		font-size: 1.1em;
      margin-top: 15px;
      margin-bottom: 15px;
  	}
  `]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
