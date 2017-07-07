import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
		<div class="jumbotron text-center">Upload an image to generate a Spotify Playlist</div>
  `,
  // styleUrls: ['./about.component.css']
  styles: [``]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
