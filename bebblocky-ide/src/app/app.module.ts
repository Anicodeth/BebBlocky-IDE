import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdePageComponent } from './ide-page/ide-page.component';
import { IdePageHeaderComponent } from './ide-page/ide-page-header/ide-page-header.component';
import { IdePageBodyComponent } from './ide-page/ide-page-body/ide-page-body.component';
import { IdePageFooterComponent } from './ide-page/ide-page-footer/ide-page-footer.component';
import { IdeEditorComponent } from './ide-page/ide-editor/ide-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CodeEditorService } from './shared/services/code-editor.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IdePreviewWindowComponent } from './ide-page/ide-preview-window/ide-preview-window.component';
import { IdeSlidesComponent } from './ide-page/ide-slides/ide-slides.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './courses/course/course.component';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { JsCoursesComponent } from './pages/js-courses/js-courses.component';
import { CssCoursesComponent } from './pages/css-courses/css-courses.component';
import { HtmlCoursesComponent } from './pages/html-courses/html-courses.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { BridgeService } from './shared/services/bridge.service';
import { ProgressRipplesComponent } from './ui/progress-ripples/progress-ripples.component';
import { SkCubesComponent } from './ui/sk-cubes/sk-cubes.component';
import { CreateCourseComponent } from './admin-panel/create-course/create-course.component';
import { IdeSlideComponent } from './ide-page/ide-slides/ide-slide/ide-slide.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSidebarComponent } from './admin-panel/admin-sidebar/admin-sidebar.component';
import { FloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';


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
    CreateCourseComponent,
    IdeSlideComponent,
    AdminPanelComponent,
    AdminSidebarComponent,
    FloatingActionButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [
    CodeEditorService,
    BridgeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
