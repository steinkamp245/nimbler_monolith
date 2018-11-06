import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SharedSignOutService } from './shared-sign-out.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  signOutMessage = 'You have been successfully logged out!';

  constructor(private userService: UserService, private router: Router, private sharedSignOutService: SharedSignOutService) {
    this.userService.signOut().subscribe(
      success => {
        this.sharedSignOutService.signOutMessage = this.signOutMessage;
        this.userService.changeAuthenticationStatus(false);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  }

  ngOnInit() { }

}
