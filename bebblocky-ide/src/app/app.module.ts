import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdePageComponent } from './ide-page/ide-page.component';
import { IdePageHeaderComponent } from './ide-page-header/ide-page-header.component';
import { IdePageBodyComponent } from './ide-page-body/ide-page-body.component';
import { IdePageFooterComponent } from './ide-page-footer/ide-page-footer.component';
import { IdePreviewWindowComponent } from './ide-preview-window/ide-preview-window.component';
import { IdeEditorComponent } from './ide-editor/ide-editor.component';
import { IdeSlidesComponent } from './ide-slides/ide-slides.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CodeEditorService } from './services/code-editor.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IdePageComponent,
    IdePageHeaderComponent,
    IdePageBodyComponent,
    IdePageFooterComponent,
    IdePreviewWindowComponent,
    IdeEditorComponent,
    IdeSlidesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [CodeEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
