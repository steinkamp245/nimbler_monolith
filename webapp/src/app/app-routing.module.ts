import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { AuthGuard } from './auth.guard';
import { SignInRedirectComponent } from './components/user/sign-in-redirect/sign-in-redirect.component';
import { AllergenComponent } from './components/main/allergen/allergen.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'users/sign-in-redirect', component: SignInRedirectComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'allergen', component: AllergenComponent }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
