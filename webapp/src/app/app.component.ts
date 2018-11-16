import { Component, OnInit } from '@angular/core';
import { UserService } from './components/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (document.cookie.includes('frontend-session')) {
      this.userService.setIsAuthenticatedSubject(true);
      let redirectUrl = window.location.pathname === '/' ? '/main/events' : window.location.pathname;
      this.router.navigate([redirectUrl]);
    }

    this.userService.tokenCheck().subscribe(
      result => {
        if (this.userService.isAuthenticated && !result) this.userService.setIsAuthenticatedSubject(result);
      }
    );
  }


}
