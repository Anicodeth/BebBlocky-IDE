import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgTerminalComponent, NgTerminalModule } from 'ng-terminal';

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
import { IdePythonEditorComponent } from './ide-python-editor/ide-python-editor.component';
import { IdePythonConsoleComponent } from './ide-python-console/ide-python-console.component';
import { PythonService } from './python.service';
import { ModernDashboardComponent } from './modern-dashboard/modern-dashboard.component';
import { ModernSidebarComponent } from './modern-sidebar/modern-sidebar.component';
import { DeleteCourseComponent } from './admin-panel/delete-course/delete-course.component';
import { EditCourseComponent } from './admin-panel/edit-course/edit-course.component';
import { CourseService } from './shared/services/course.service';

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
    FloatingActionButtonComponent,
    IdePythonEditorComponent,
    IdePythonConsoleComponent,
    ModernDashboardComponent,
    ModernSidebarComponent,
    DeleteCourseComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    NgTerminalModule,
    BrowserAnimationsModule
  ],
  providers: [
    CodeEditorService,
    BridgeService,
    PythonService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
