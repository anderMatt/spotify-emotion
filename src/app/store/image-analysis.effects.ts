import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/mergemap';

import {ImageAnalyzerService} from '../shared/image-analyzer.service';
import {SpotifyTrack} from '../models/spotify-track.model';
import * as imageAnalysis from './image-analysis.actions';

@Injectable()
export class ImageAnalysisEffects{

	@Effect()
	analyzeImage$: Observable<Action> = this.actions$
		.ofType(imageAnalysis.ANALYZE_IMAGE_REQUEST)
		.do(()=>console.log('Inside analyzeImage$ effects chain'))
		.map( (action: imageAnalysis.AnalyzeImageRequestAction) => action.payload)
		.mergeMap(image => this.imageAnalyzerService.generatePlaylistFromImage(image)
			.map(res => new imageAnalysis.AnalyzeImageSuccessAction(res))
		)
		.do(()=>console.log('At end of analyzeImage$ effects chain'));

	constructor(private actions$: Actions, private imageAnalyzerService: ImageAnalyzerService ){}
}