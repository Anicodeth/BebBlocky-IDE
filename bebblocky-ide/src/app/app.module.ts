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
import { CodeEditorService } from './shared/services/code-editor.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IdePreviewWindowComponent } from './ide-page/ide-preview-window/ide-preview-window.component';
import { IdeSlidesComponent } from './ide-page/ide-slides/ide-slides.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './dashboard/components/courses/courses.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { CourseComponent } from './dashboard/components/courses/course/course.component';
import { AllCoursesComponent } from './dashboard/pages/all-courses/all-courses.component';
import { MyCoursesComponent } from './dashboard/pages/my-courses/my-courses.component';
import { JsCoursesComponent } from './dashboard/pages/js-courses/js-courses.component';
import { CssCoursesComponent } from './dashboard/pages/css-courses/css-courses.component';
import { HtmlCoursesComponent } from './dashboard/pages/html-courses/html-courses.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { BridgeService } from './shared/services/bridge.service';
import { ProgressRipplesComponent } from './ui/progress-ripples/progress-ripples.component';
import { SkCubesComponent } from './ui/sk-cubes/sk-cubes.component';
import { SlideCreatorComponent } from './slide-creator/slide-creator.component';


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
    LoginPageComponent,
    LandingPageComponent,
    DashboardComponent,
    CoursesComponent,
    SidebarComponent,
    ProfileComponent,
    HeaderComponent,
    CourseComponent,
    AllCoursesComponent,
    MyCoursesComponent,
    JsCoursesComponent,
    CssCoursesComponent,
    HtmlCoursesComponent,
    TruncatePipe,
    LoadingSpinnerComponent,
    ProgressRipplesComponent,
    SkCubesComponent,
    SlideCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CodeEditorService,
    BridgeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
