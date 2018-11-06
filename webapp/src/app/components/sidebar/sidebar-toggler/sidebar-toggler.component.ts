import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidebar-toggler',
  templateUrl: './sidebar-toggler.component.html',
  styleUrls: ['./sidebar-toggler.component.scss'],
  animations: [
    trigger('toggleArrow', [
      state('open', style({
        transform: 'rotate(180deg)',
      })),
      state('closed', style({
        transform: 'rotate(0deg)',
      })),
      transition('open => closed', [
        animate('270ms')
      ]),
      transition('closed => open', [
        animate('270ms')
      ]),
    ]),

  ]
})
export class SidebarTogglerComponent implements OnInit {
  @Output() toggled = new EventEmitter<void>();
  isOpen = false;
  constructor() { }

  ngOnInit() {
  }

  sidebarToggled() {
    this.toggled.emit();
    this.isOpen = !this.isOpen;
  }
}
