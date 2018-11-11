import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation/geolocation.service';
import { EventsService } from '../main/events/events.service';
import { map } from 'rxjs/operators';


interface Circle {
  radius: number
  fillColor: string
  fillOpacity: number;
  currentlyInAnimation: boolean
}

interface Map {
  zoom: number;
  mapReady: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  myPosition: Position;

  mySearchRadius: Circle = {
    radius: 10000,
    fillColor: 'black',
    fillOpacity: 0,
    currentlyInAnimation: false
  }

  myMap: Map = {
    zoom: 11,
    mapReady: false
  }

  constructor(private geoService: GeolocationService, private eventsService: EventsService) { }

  ngOnInit() {
    this.geoService.getGeolocationAvailableSubject().subscribe(
      isAvailable => {
        if (isAvailable) this.myPosition = this.geoService.geolocation;
      }
    );

    this.eventsService.getSearchRangeSubect().subscribe(
      async range => {
        this.mySearchRadius.radius = range * 1000;
        let temp = range;
        if (this.myMap.mapReady) {
          await this.sleep(600);
          if (temp * 1000 === this.mySearchRadius.radius && !this.mySearchRadius.currentlyInAnimation) {
            this.circleEvent(0, 'easeIn');
          }
        }
      }
    );
  }

  private async setMapReady() {
    this.myMap.mapReady = true;
  }

  private async circleEvent(nextValue: number, state: 'easeIn' | 'easeOut') {
    let values = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.1, 0.1, 0.1];
    this.mySearchRadius.fillOpacity = values[nextValue];
    this.mySearchRadius.currentlyInAnimation = true;

    if (state === 'easeIn' && nextValue < 13) {
      await this.sleep(100);
      this.circleEvent(nextValue + 1, 'easeIn');
    }
    else if (nextValue > 0) {
      await this.sleep(100);
      this.circleEvent(nextValue - 1, 'easeOut')
    }
    else {
      await this.sleep(800);
      this.mySearchRadius.currentlyInAnimation = false;
    }
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
