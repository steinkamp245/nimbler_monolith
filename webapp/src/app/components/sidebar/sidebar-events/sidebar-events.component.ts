import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../main/events/events.service';


@Component({
  selector: 'app-sidebar-events',
  templateUrl: './sidebar-events.component.html',
  styleUrls: ['./sidebar-events.component.scss']
})
export class SidebarEventsComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  ngOnInit() {

  }


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 0) {
      return Math.round(value / 10) + 'h';
    }

    return value;
  }

}
