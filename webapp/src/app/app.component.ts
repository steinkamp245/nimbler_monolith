import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './components/user/user.service';
import { GeolocationService } from './components/geolocation/geolocation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _opened: boolean = false;
  private showNoGeolocationErrorScreen = false;
  currentURL = this.router.url;

  constructor(private router: Router, private userService: UserService, private geoService: GeolocationService) { }

  ngOnInit() {
    window.onresize = () => this._opened = false;

    this.userService.tokenCheck().subscribe(
      result => {
        this.userService.changeAuthenticationStatus(result);
        this._opened = result;
        if (result) this.geoService.getGeolocation();
      }
    );

    this.userService.isAuthenticatedEvent.subscribe(
      result => this._opened = result
    );

    this.geoService.getGeolocationAvailableSubject().subscribe(
      result => this._opened = result
    );

    this.geoService.getGeolocationBlockedSubject().subscribe(
      result => this.showNoGeolocationErrorScreen = result
    );
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  isActive(component: string) {
    return this.router.url === `/main/${component}` ? true : false;
  }

  isAuthenticated() {
    return this.userService.isAuthenticated;
  }
}
