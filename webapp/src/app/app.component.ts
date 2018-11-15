import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './components/user/user.service';
import { GeolocationService } from './components/geolocation/geolocation.service';
import 'hammerjs';
import { UserDataCacheService } from './components/user/user-data-cache.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private opened: boolean = false;
  private showNoGeolocationErrorScreen = false;
  currentURL = this.router.url;

  constructor(private router: Router, private userService: UserService,
    private geoService: GeolocationService, private userDataCacheService: UserDataCacheService) { }

  ngOnInit() {
    this.userService.tokenCheck().subscribe(
      result => {
        this.userService.changeAuthenticationStatus(result);
        this.opened = result;
        if (result) {
          this.geoService.getGeolocation();
          this.userService.getEventConfig().subscribe(
            eventConfig => this.userDataCacheService.setEventConfigSubject(eventConfig)
          );
        }
      }
    );

    this.userService.isAuthenticatedEvent.subscribe(
      result => this.opened = result
    );

    this.geoService.getGeolocationAvailableSubject().subscribe(
      result => this.opened = result
    );

    this.geoService.getGeolocationBlockedSubject().subscribe(
      result => this.showNoGeolocationErrorScreen = result
    );
  }



  isActive(component: string) {
    return this.router.url === `/main/${component}` ? true : false;
  }

  isAuthenticated() {
    return this.userService.isAuthenticated;
  }
}
