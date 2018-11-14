import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDataCacheService } from '../../user/user-data-cache.service';
import { UserService } from '../../user/user.service';



@Component({
  selector: 'app-sidebar-events',
  templateUrl: './sidebar-events.component.html',
  styleUrls: ['./sidebar-events.component.scss']
})
export class SidebarEventsComponent implements OnInit {
  categories = new FormControl();
  sliderx = new FormControl();
  categoryList: string[] = ['Sport', 'Chill', 'Party', 'Education', 'Other'];


  constructor(private userDataCacheService: UserDataCacheService, private userService: UserService) { }

  ngOnInit() {
    this.userDataCacheService.getEventConfigSubject().subscribe(
      eventConfig => {
        this.categories.setValue(eventConfig.categories);
        this.sliderx.setValue(eventConfig.latestStartTime * 10)
      }
    );
  }

  formatLabel(value: number | null) {
    if (!value) return 0;
    if (value >= 0) return Math.round(value / 10) + 'h';
    return value;
  }

  categorySelected(categories: string[]) {
    let eventConfig = {
      categories,
      latestStartTime: Math.round(this.sliderx.value / 10)
    }
    this.userDataCacheService.setEventConfigSubject(eventConfig);
    this.userService.putEventConfigCategories(categories).subscribe();
  }


  saveLatestStartTime() {
    let eventConfig = {
      categories: this.categories.value,
      latestStartTime: Math.round(this.sliderx.value / 10)
    }
    this.userDataCacheService.setEventConfigSubject(eventConfig);
    this.userService.putEventConfigLatestStartTime(eventConfig.latestStartTime).subscribe();
  }


}
