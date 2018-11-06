import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sign-in-redirect',
  templateUrl: './sign-in-redirect.component.html',
  styleUrls: ['./sign-in-redirect.component.scss']
})
export class SignInRedirectComponent implements OnInit {

  constructor(private router: Router, private sessionSt: SessionStorageService) { }

  ngOnInit() {
    const redirectURL = this.sessionSt.retrieve("redirectURL");
    this.sessionSt.clear("redirectURL");
    this.router.navigate([redirectURL || '/home']);
  }

}
