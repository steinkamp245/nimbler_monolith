import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar-events',
  templateUrl: './sidebar-events.component.html',
  styleUrls: ['./sidebar-events.component.scss']
})
export class SidebarEventsComponent implements OnInit {
  categories = new FormControl();
  categoryList: string[] = ['Sport', 'Chill', 'Party', 'Education', 'Other']

  constructor() { }

  ngOnInit() { }

  formatLabel(value: number | null) {
    if (!value) return 0;
    if (value >= 0) return Math.round(value / 10) + 'h';
    return value;
  }

}
