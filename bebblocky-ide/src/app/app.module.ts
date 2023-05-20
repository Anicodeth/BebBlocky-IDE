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
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfilePageSidebarComponent } from './profile-page-sidebar/profile-page-sidebar.component';
import { ProfilePageUserdataComponent } from './profile-page-userdata/profile-page-userdata.component';
import { ProfilePageProgressComponent } from './profile-page-progress/profile-page-progress.component';
import { CodeEditorService } from './services/code-editor.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    AppComponent,
    IdePageComponent,
    IdePageHeaderComponent,
    IdePageBodyComponent,
    IdePageFooterComponent,
    IdePreviewWindowComponent,
    IdeEditorComponent,
    IdeSlidesComponent,
    ProfilePageComponent,
    ProfilePageSidebarComponent,
    ProfilePageUserdataComponent,
    ProfilePageProgressComponent,
    LoginPageComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CodeEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
