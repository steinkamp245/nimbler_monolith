import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';


import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageComponent } from './shared/notifications/error-message/error-message.component';
import { AlertCloseableComponent } from './shared/notifications/alert-closeable/alert-closeable.component';
import { EmailDirective } from './components/user/directives/email.directive';
import { PasswordDirective } from './components/user/directives/password.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './components/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';
import { EqualPasswordsDirective } from './components/user/directives/equal-passwords.directive';
import { SignInRedirectComponent } from './components/user/sign-in-redirect/sign-in-redirect.component';
import { SidebarTogglerComponent } from './components/sidebar/sidebar-toggler/sidebar-toggler.component';
import { SidebarCategoriesComponent } from './components/sidebar/sidebar-categories/sidebar-categories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { EventsComponent } from './components/main/events/events.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { NoGeolocationAvailableComponent } from './components/geolocation/no-geolocation-available/no-geolocation-available.component';
import { SidebarEventsComponent } from './components/sidebar/sidebar-events/sidebar-events.component';
import { SidebarChatComponent } from './components/sidebar/sidebar-chat/sidebar-chat.component';
import { ChatComponent } from './components/main/chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalComponent,
    SignInComponent,
    ErrorMessageComponent,
    AlertCloseableComponent,
    EmailDirective,
    PasswordDirective,
    HomeComponent,
    MainComponent,
    SignOutComponent,
    EqualPasswordsDirective,
    SignInRedirectComponent,
    SidebarTogglerComponent,
    SidebarCategoriesComponent,
    EventsComponent,
    MapComponent,
    NoGeolocationAvailableComponent,
    SidebarEventsComponent,
    SidebarChatComponent,
    ChatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALrPFiYjvnAR9Ai25kbQsUT2SXvpdp0X4'
    }),
    MatInputModule,
    MatSelectModule,
    MatSliderModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
