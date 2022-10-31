import { Component, AfterViewInit } from '@angular/core';
import { icon, Map, map, Marker, marker, tileLayer,  } from 'leaflet';
import { BackendApiService } from 'src/app/services/backendApi/backend-api.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-points-in-map',
  templateUrl: './points-in-map.component.html',
  styleUrls: ['./points-in-map.component.css']
})
export class PointsInMapComponent implements AfterViewInit {
  private map: Map | undefined;

  constructor(private api : BackendApiService) { }
  ngAfterViewInit(): void {
    //this string map is the HTML element div id=map
    this.initMap(this.map, this.popupPoints);
  }

  initMap( mapa: Map | undefined, popupMaker: Function){

    if(typeof  mapa === 'undefined') {
      mapa = map('map', {
        center: [-10.3333333,-53.2],
        zoom: 3,

     });
    }

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: 'Powered by <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    //Print the map
    tiles.addTo(mapa);

    //Print points in the map
    const points: Marker[]=[];
    this.api.getCapitals().subscribe({
      next(result) {
        result.capitals.forEach(capital=>{
          const point = marker([Number(capital.lat),Number(capital.lon)]);
          point.bindPopup(popupMaker(capital.capital,capital.state,capital.state_code));
          if(typeof mapa !== 'undefined') point.addTo(mapa);
        });
      },
      error(err) {
        console.log(err);
      },
    });
  }

  popupPoints(capital: string, state: string, state_code: string):string{
    return `${capital} is capital of state ${state}(${state_code})`;
  }

}
