import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation/geolocation.service';


interface Circle {
  radius: number
  fillColor: string
  fillOpacity: number;
}

interface Map {
  zoom: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  myPosition: Position;

  mySearchRadius: Circle = {
    radius: 5000,
    fillColor: 'black',
    fillOpacity: 0.1
  }

  myMap: Map = {
    zoom: 11
  }

  constructor(private geoService: GeolocationService) { }

  ngOnInit() {
    this.geoService.getGeolocationAvailableSubject().subscribe(
      isAvailable => {
        if (isAvailable) {
          this.myPosition = this.geoService.geolocation;
        }
      }
    );

    // this.circleEvent(0, 'easeIn');
  }



  async circleEvent(nextValue: number, state: 'easeIn' | 'easeOut') {
    let values = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1];
    this.mySearchRadius.fillOpacity = values[nextValue];

    if (state === 'easeOut' && nextValue === 0) {
      await this.sleep(100);
      this.circleEvent(nextValue, 'easeIn');
    }
    else if (state === 'easeIn' && nextValue < 10) {
      await this.sleep(100);
      this.circleEvent(nextValue + 1, 'easeIn');
    }
    else {
      await this.sleep(100);
      this.circleEvent(nextValue - 1, 'easeOut')
    }
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
