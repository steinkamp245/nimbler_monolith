import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { AuthGuard } from './auth.guard';
import { SignInRedirectComponent } from './components/user/sign-in-redirect/sign-in-redirect.component';
import { EventsComponent } from './components/main/events/events.component';
import { NoGeolocationAvailableComponent } from './components/geolocation/no-geolocation-available/no-geolocation-available.component';
import { ChatComponent } from './components/main/chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'geolocation-error', component: NoGeolocationAvailableComponent },
  { path: 'users/sign-in', component: SignInComponent },
  { path: 'users/sign-out', component: SignOutComponent },
  { path: 'users/sign-in-redirect', component: SignInRedirectComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: 'events', component: EventsComponent },
      { path: 'chat', component: ChatComponent }
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
