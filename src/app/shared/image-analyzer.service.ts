import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../store';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {SpotifyTrack} from '../models/spotify-track.model';
import * as imageAnalysis from '../store/image-analysis.actions';


@Injectable()
export class ImageAnalyzerService{
	private url = "/api/playlist";
	constructor(private store: Store<fromRoot.AppState>, private http: Http){
	}

	generatePlaylistFromImage(imageStr: string){
		return this.http.post(this.url, {image: imageStr})
			// .map(res => res.json());
			.map(res => {
				var data = res.json();
				if(data.playlist.length === 0){
					// return Observable.throw(data.message);  --> NOT WORKING
					throw(data.message);
				}
				return data;
			});
	}
}