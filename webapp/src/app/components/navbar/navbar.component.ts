import { Component, OnInit, Input } from '@angular/core';
import { SignInComponent } from '../user/sign-in/sign-in.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInComponent = SignInComponent;
  title = 'Nimbler';
  navbarIsCollapsed = true;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }
}
