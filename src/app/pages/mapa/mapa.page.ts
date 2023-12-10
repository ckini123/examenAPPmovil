import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map!: L.Map;

  constructor() { }

  
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.map= L.map('mapId', {
      zoomControl: false,
    }).setView([-33.598605987251375, -70.57906151423265],16) 
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:18
      }).addTo(this.map);
      this.map.invalidateSize();
      var nuevoIcono = L.icon({
        iconUrl: 'assets/img/destino.png',
        iconSize: [50, 50],
    });
      L.marker([-33.598605987251375, -70.57906151423265],{ icon: nuevoIcono }).addTo(this.map);

  }
  ionViewWillLeave(){
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  };
}
