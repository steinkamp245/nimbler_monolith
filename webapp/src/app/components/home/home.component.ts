import { Component, OnInit } from '@angular/core';
import { SharedSignOutService } from '../user/sign-out/shared-sign-out.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logOutMessage = '';

  constructor(private sharedSignOutService: SharedSignOutService) {
    this.logOutMessage = this.sharedSignOutService.signOutMessage;
    this.sharedSignOutService.signOutMessage = '';
  }

  ngOnInit() {
    setTimeout(() => { this.logOutMessage = ''; }, 3500);
  }

}
