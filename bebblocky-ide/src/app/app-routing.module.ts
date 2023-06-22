import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IdePageComponent } from './ide-page/ide-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'ide/:slideId', component: IdePageComponent },
  { path: 'courses/:type', component: ProfilePageComponent},
  { path: 'courses', component: ProfilePageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'login', component:LoginPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
