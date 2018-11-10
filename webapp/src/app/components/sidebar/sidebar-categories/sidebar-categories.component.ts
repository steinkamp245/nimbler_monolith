import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-categories',
  templateUrl: './sidebar-categories.component.html',
  styleUrls: ['./sidebar-categories.component.scss']
})
export class SidebarCategoriesComponent implements OnInit {

  @ViewChild('events') events: ElementRef;
  @ViewChild('chat') chat: ElementRef;


  currentURL = this.router.url;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  focusMe(name: string): void {
    this[name].nativeElement.focus();
  }

  isMenuPointSelected(component: string) {
    return this.router.url === `/main/${component}` ? true : false;
  }

}
