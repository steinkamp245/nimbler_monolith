import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './components/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _opened: boolean = false;
  currentURL = this.router.url;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.tokenCheck().subscribe(
      result => {
        this.userService.isAuthenticated = result
        this._opened = result;
      }
    );

    this.userService.isAuthenticatedEvent.subscribe(
      triggered => this._opened = triggered
    );

    window.onresize = () => { this._opened = false; }
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
