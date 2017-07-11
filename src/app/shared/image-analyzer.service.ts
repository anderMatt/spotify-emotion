import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Store} from '@ngrx/store';
import * as fromRoot from '../store';
import 'rxjs/add/operator/map';

import {SpotifyTrack} from '../models/spotify-track.model';
import * as imageAnalysis from '../store/image-analysis.actions';

@Injectable()
export class ImageAnalyzerService {
	private url = "/api/playlist";
	constructor(private store: Store<fromRoot.AppState>, private http: Http ){

	}

	generatePlaylistFromImage(imageStr: string){  //Base64 encoded image string to get PL from.
		console.log('Inside service.generatePlaylistFromImage()');

		//this.http.post
		return this.http.post(this.url, {image: imageStr})
			.map(res => res.json());
	}
}
