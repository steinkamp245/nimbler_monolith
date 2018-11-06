import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageComponent } from './shared/notifications/error-message/error-message.component';
import { AlertCloseableComponent } from './shared/notifications/alert-closeable/alert-closeable.component';
import { EmailDirective } from './components/user/directives/email.directive';
import { PasswordDirective } from './components/user/directives/password.directive';
import { FormsModule } from '@angular/forms';
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
import { AllergenComponent } from './components/main/allergen/allergen.component';
import { NgxWebstorageModule } from 'ngx-webstorage';


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
    AllergenComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
