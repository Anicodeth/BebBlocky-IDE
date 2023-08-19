import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { BridgeService } from './shared/bridge.service';
import { CodeEditorService } from './shared/code-editor.service';
import { IdePageComponent } from './ide-page/ide-page.component';
import { IdeSlideComponent } from './ide-page/ide-slides/ide-slide/ide-slide.component';
import { IdeEditorComponent } from './ide-page/ide-editor/ide-editor.component';
import { IdeSlidesComponent } from './ide-page/ide-slides/ide-slides.component';
import { IdePageBodyComponent } from './ide-page/ide-page-body/ide-page-body.component';
import { IdePageFooterComponent } from './ide-page/ide-page-footer/ide-page-footer.component';
import { IdePageHeaderComponent } from './ide-page/ide-page-header/ide-page-header.component';
import { IdePreviewWindowComponent } from './ide-page/ide-preview-window/ide-preview-window.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkCubesComponent } from './ui/sk-cubes/sk-cubes.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ProgressRipplesComponent } from './ui/progress-ripples/progress-ripples.component';
import { FormsModule } from '@angular/forms';
import { IdePythonEditorComponent } from './ide-python-editor/ide-python-editor.component';
import { IdePythonConsoleComponent } from './ide-python-console/ide-python-console.component';
import { PythonService } from './shared/services/python.service';
import { NgTerminalModule } from 'ng-terminal';

@NgModule({
  declarations: [
    AppComponent,
    IdePageComponent,
    IdeSlideComponent,
    IdeEditorComponent,
    IdeSlidesComponent,
    IdePageBodyComponent,
    IdePageFooterComponent,
    IdePageHeaderComponent,
    IdePreviewWindowComponent,
    SkCubesComponent,
    LoadingSpinnerComponent,
    ProgressRipplesComponent,
    IdePythonEditorComponent,
    IdePythonConsoleComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    NgTerminalModule,
  ],
  providers: [
    BridgeService,
    CodeEditorService,
    PythonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
      const webComponent = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define('angular-component', webComponent);
    }

    ngDoBootstrap() { }
  }
