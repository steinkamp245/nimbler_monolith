import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.userService.signOut().subscribe(
      success => {
        this.userService.setIsAuthenticatedSubject(false);
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  }

  ngOnInit() { }

}
