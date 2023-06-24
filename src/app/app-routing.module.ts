import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // ...canActivate(redirectToHome),
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    // ...canActivate(redirectToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    // ...canActivate(redirectToLogin),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // ...canActivate(redirectToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
