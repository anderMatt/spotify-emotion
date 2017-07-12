import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {StoreModule} from '@ngrx/store';
// import {AppState} from './store';
// import {reducer} from './store/image-analysis.reducer';
// import {reducer} from './store';
import * as fromRoot from './store';

import {EffectsModule} from '@ngrx/effects';
import {ImageAnalysisEffects} from './store/image-analysis.effects';
import {TrackAudioEffects} from './store/track-audio.effects';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';

import {ImageAnalyzerService} from './shared/image-analyzer.service';
import {TrackAudioService} from './shared/track-audio.service';
import { ImageUploadComponent } from './image-analysis/image-upload/image-upload.component';
import { ImagePreviewComponent } from './image-analysis/image-upload/image-preview/image-preview.component';
import { AboutComponent } from './about/about.component';
import { ImageAnalysisComponent } from './image-analysis/image-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistDetailComponent,
    ImageUploadComponent,
    ImagePreviewComponent,
    AboutComponent,
    ImageAnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(fromRoot.reducer),
    EffectsModule.run(ImageAnalysisEffects),
    EffectsModule.run(TrackAudioEffects)
  ],
  providers: [ImageAnalyzerService, TrackAudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
