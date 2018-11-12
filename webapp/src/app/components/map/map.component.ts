import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation/geolocation.service';



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

  myMap: Map = {
    zoom: 14,
    mapReady: false
  }



  constructor(private geoService: GeolocationService) { }

  ngOnInit() {
    this.geoService.getGeolocationAvailableSubject().subscribe(
      isAvailable => this.myPosition = isAvailable ? this.geoService.geolocation : undefined
    );
  }



}
