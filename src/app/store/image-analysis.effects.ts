import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import {ImageAnalyzerService} from '../shared/image-analyzer.service';
import {SpotifyTrack} from '../models/spotify-track.model';
import {EmotionProfile} from '../models/emotion-profile.model';
import {ImageAnalysisResponse} from '../models/image-analysis.model';
import * as imageAnalysis from './image-analysis.actions';

@Injectable()
export class ImageAnalysisEffects{

	@Effect()
	analyzeImage$: Observable<Action> = this.actions$
		.ofType(imageAnalysis.ANALYZE_IMAGE_REQUEST)
		.map((action: imageAnalysis.AnalyzeImageRequestAction) => action.payload)  //img url
		.switchMap(image => this.imageAnalyzerService.generatePlaylistFromImage(image)
			.map((res: ImageAnalysisResponse) => new imageAnalysis.AnalyzeImageSuccessAction(res))
			.catch(msg => {
				return of(new imageAnalysis.AnalyzeImageFailAction(msg))
			})
			);
	constructor(private actions$: Actions, private imageAnalyzerService: ImageAnalyzerService ){}
}