import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdePageComponent } from './ide-page/ide-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllCoursesComponent } from './dashboard/pages/all-courses/all-courses.component';
import { MyCoursesComponent } from './dashboard/pages/my-courses/my-courses.component';
import { JsCoursesComponent } from './dashboard/pages/js-courses/js-courses.component';
import { CssCoursesComponent } from './dashboard/pages/css-courses/css-courses.component';
import { HtmlCoursesComponent } from './dashboard/pages/html-courses/html-courses.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { SlideCreatorComponent } from './slide-creator/slide-creator.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'ide/:slideId', component: IdePageComponent, canActivate: [LoggedInGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'add-slides', component: SlideCreatorComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
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
