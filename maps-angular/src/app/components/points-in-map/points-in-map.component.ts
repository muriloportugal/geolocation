import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { icon, Map, map, Marker, marker, tileLayer, layerGroup, LayerGroup } from 'leaflet';
import { Observable } from 'rxjs';
import { startWith, map as mapOperator } from 'rxjs/operators';
import { BackendApiService, Capital } from 'src/app/services/backendApi/backend-api.service';

//******************************************
//        Leaflet Icon
//******************************************
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
export class PointsInMapComponent implements AfterViewInit, OnInit {
  private map: Map | undefined;
  private layerGroup: LayerGroup | undefined;
  myControl = new FormControl('');
  private states: string[] = [''];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private api : BackendApiService) { }

  ngOnInit(): void {
    //Get all states to fill the auto-complete html element
    const findStates:string[] = []
    this.api.getCapitals().subscribe({
      next(value) {
        findStates.push( ... value.capitals.reduce<string[]>((acc,curr)=>{
                              acc.push(curr.state);
                              return acc;
                            },[])
        );
      },
    });
    findStates.unshift('All');
    this.states = findStates;

    //Handle the event when the value of autocomplet changes
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      mapOperator(value => this._filter(value || '')),
    );
  }

  ngAfterViewInit(): void {
    //this string map is the HTML element div id=map
    this.initMap();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().includes(filterValue));
  }

  stateSelected(){
    const stateName: string = this.myControl.getRawValue() ?? '';
    const capital = this._findCapital(stateName);
    if(typeof capital !== 'undefined') {
      this._addMarkerToMap(capital);
    }
  }

  private _findCapital(state:string): Capital[] {
    let capital: Capital[] = [];
    this.api.getCapitals().subscribe({
      next(value) {
        if(state === 'All') {
          capital.push(...value.capitals);
        }else{
          const found = value.capitals.find((capital)=>capital.state === state);
          if(typeof found !== 'undefined') {
            capital.push(found);
          }
        }
      },
    });
    return capital;
  }

  private _addMarkerToMap(capitals:Capital[], ){
    //Remove all previous markers
    this.layerGroup?.clearLayers();
    //Create a new point in map
    const markers: Marker[] = [];
    capitals.forEach(capital=>{
      const point = marker([Number(capital.lat),Number(capital.lon)]);
      point.bindPopup(this._popupPoints(capital.capital,capital.state,capital.state_code));
      markers.push(point);
    });
    if(typeof this.map !== 'undefined'){
      this.layerGroup = layerGroup(markers);
      this.layerGroup.addTo(this.map);
    }
  }

  private _popupPoints(capital: string, state: string, state_code: string):string{
    return `${capital} is capital of state ${state}(${state_code})`;
  }

  initMap(){
    if(typeof  this.map === 'undefined') {
      this.map = map('map', {
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
    tiles.addTo(this.map);
  }

}
