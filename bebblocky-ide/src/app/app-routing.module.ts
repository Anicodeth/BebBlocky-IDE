import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IdePageComponent } from './ide-page/ide-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { AllCoursesComponent } from './dashboard/all-courses/all-courses.component';
import { MyCoursesComponent } from './dashboard/my-courses/my-courses.component';
import { JsCoursesComponent } from './dashboard/js-courses/js-courses.component';
import { CssCoursesComponent } from './dashboard/css-courses/css-courses.component';
import { HtmlCoursesComponent } from './dashboard/html-courses/html-courses.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'ide/:slideId', component: IdePageComponent },
  { path: 'courses/:type', component: ProfilePageComponent },
  { path: 'courses', component: ProfilePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'courses', component: AllCoursesComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'js-courses', component: JsCoursesComponent },
      { path: 'css-courses', component: CssCoursesComponent },
      { path: 'html-courses', component: HtmlCoursesComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
