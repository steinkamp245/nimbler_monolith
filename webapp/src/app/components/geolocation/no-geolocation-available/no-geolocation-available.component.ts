import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';




@Component({
  selector: 'app-no-geolocation-available',
  templateUrl: './no-geolocation-available.component.html',
  styleUrls: ['./no-geolocation-available.component.scss'],
  animations: [
    trigger('toggleArrow', [
      state('open', style({
        transform: 'rotate(-360deg)',
      })),
      state('closed', style({
        transform: 'rotate(-0)',
      })),
      transition('open => closed', [
        animate('700ms')
      ]),
      transition('closed => open', [
        animate('0ms')
      ]),
    ]),

  ]
})
export class NoGeolocationAvailableComponent implements OnInit {
  isOpen = false;
  constructor() { }

  ngOnInit() {
    this.isOpen = true;
    setInterval(() => this.isOpen = !this.isOpen, 1200)
  }

  reloadPage() {
    window.location.href = window.location.href;
  }
}
