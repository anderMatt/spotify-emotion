import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {AppState} from './store/app.state';
import {reducer} from './store/image-analysis.reducer';

import {EffectsModule} from '@ngrx/effects';
import {ImageAnalysisEffects} from './store/image-analysis.effects';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';

import {ImageAnalyzerService} from './shared/image-analyzer.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImagePreviewComponent } from './image-upload/image-preview/image-preview.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistDetailComponent,
    ImageUploadComponent,
    ImagePreviewComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({imageAnalysis: reducer}),
    EffectsModule.run(ImageAnalysisEffects)
  ],
  providers: [ImageAnalyzerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
