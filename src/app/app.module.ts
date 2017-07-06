import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';

import {ImageAnalyzerService} from './shared/image-analyzer.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImagePreviewComponent } from './image-upload/image-preview/image-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistDetailComponent,
    ImageUploadComponent,
    ImagePreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ImageAnalyzerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
