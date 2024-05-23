import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

import {
  Map,
  Marker,
  NavigationControl,
  LngLatLike,
  LngLat,
  LngLatBounds,
  Point,
} from 'maplibre-gl';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beningings';
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  marker: Marker;
  constructor() {}
  ngOnDestroy() {
    this.map?.remove();
  }
  ngOnInit(): void {}
  aMarker: any;
  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh`,
      // style: './../../../assets/map.style.json',
      // style:`https://api.maptiler.com/data/65427794-100e-425d-b631-2ff9ca13687b/features.json?key=CH1cYDfxBV9ZBu1lHGqh`,
      center: initialState,

      zoom: 3,
      hash: true,
    });
  
    // this.aMarker = new Marker(document.getElementById('marker')).setOffset([0, 0]).setDraggable(true).setLngLat([-108.54491326556354,70.3919058347233]).addTo(this.map);
    this.map.on('click', (e) => {
      if(e){
      const coords = e.lngLat;
        console.log("e",e)
        console.log("coords",coords)
        localStorage.setItem('coords', coords.toString());
        this.renderMarkerAtCoordinates(coords);
        // document.getElementById('info').innerHTML =
        //   'Click View:' + ' ' + JSON.stringify(coords);
      }
      

      
    });
  }

  demo(coo:any){
    console.log("coords in demo",coo);
    
  }

 
  renderMarkerAtCoordinates(coords: LngLat): void {
    // Remove the previous marker if it exists
    if (this.marker) {
      this.marker.remove();
    }

    // Create a new marker element
    const markerDiv = document.createElement('div');
    markerDiv.className = 'custom-marker';

    // Add the marker to the map
    this.marker = new Marker(markerDiv)
      .setLngLat(coords)
      .addTo(this.map);
  }

}
