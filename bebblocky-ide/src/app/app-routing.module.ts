import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdePageComponent } from './ide-page/ide-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllCoursesComponent } from './pages/all-courses/all-courses.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { JsCoursesComponent } from './pages/js-courses/js-courses.component';
import { CssCoursesComponent } from './pages/css-courses/css-courses.component';
import { HtmlCoursesComponent } from './pages/html-courses/html-courses.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { CreateCourseComponent } from './admin-panel/create-course/create-course.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { IsAdminGuard } from './shared/guards/is-admin.guard';
import { IdePythonEditorComponent } from './ide-python-editor/ide-python-editor.component';
import { ModernDashboardComponent } from './modern-dashboard/modern-dashboard.component';
import { DeleteCourseComponent } from './admin-panel/delete-course/delete-course.component';
import { EditCourseComponent } from './admin-panel/edit-course/edit-course.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: sessionStorage.getItem('auth_token') ? '/dashboard' : '/landing',
    // pathMatch: 'full',
    component: LandingPageComponent
  },
  { path: 'ide/:courseId', component: IdePageComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginPageComponent },
   //{
   // path: 'dashboard',
    // redirectTo: '/dashboard/profile',
    // pathMatch: 'full',
   // component: DashboardComponent,
   // canActivate: [LoggedInGuard],
   // children: [
   //   { path: 'courses', component: AllCoursesComponent },
    //  { path: 'my-courses', component: MyCoursesComponent },
    //  { path: 'js-courses', component: JsCoursesComponent },
    //  { path: 'css-courses', component: CssCoursesComponent },
    //  { path: 'html-courses', component: HtmlCoursesComponent },
    //  { path: 'profile', component: ProfileComponent }
    //]
  //} ,
  {
    path: 'dashboard',
    component: ModernDashboardComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: 'courses', component: AllCoursesComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'js-courses', component: JsCoursesComponent },
      { path: 'css-courses', component: CssCoursesComponent },
      { path: 'html-courses', component: HtmlCoursesComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  } ,
  {
    path: 'admin',
    component: AdminPanelComponent,
    // redirectTo: '/admin/courses',
    // pathMatch: 'full',
    canActivate: [LoggedInGuard, IsAdminGuard],
    children: [
      // When an admin delete course is called, it should delete the course and redirect to /admin/courses
      { path: 'delete-course/:courseId', component: DeleteCourseComponent },
      { path: 'create-course', component: CreateCourseComponent, },
      { path: 'edit-course/:courseId', component: EditCourseComponent },
      { path: 'courses', component: AllCoursesComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'js-courses', component: JsCoursesComponent },
      { path: 'css-courses', component: CssCoursesComponent },
      { path: 'html-courses', component: HtmlCoursesComponent },
      { path: 'python-courses', component: ProfileComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
