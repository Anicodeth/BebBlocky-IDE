import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdePageComponent } from './ide-page/ide-page.component';
import { IdePageHeaderComponent } from './ide-page/ide-page-header/ide-page-header.component';
import { IdePageBodyComponent } from './ide-page/ide-page-body/ide-page-body.component';
import { IdePageFooterComponent } from './ide-page/ide-page-footer/ide-page-footer.component';
import { IdeEditorComponent } from './ide-page/ide-editor/ide-editor.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfilePageUserdataComponent } from './profile-page-userdata/profile-page-userdata.component';
import { CodeEditorService } from './services/code-editor.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfilePageSidebarComponent } from './profile-page-sidebar/profile-page-sidebar.component';
import { IdePreviewWindowComponent } from './ide-page/ide-preview-window/ide-preview-window.component';
import { IdeSlidesComponent } from './ide-page/ide-slides/ide-slides.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HeaderComponent } from './dashboard/header/header.component';


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
    LoginPageComponent,
    LandingPageComponent,
    DashboardComponent,
    CoursesComponent,
    SidebarComponent,
    ProfileComponent,
    HeaderComponent
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
