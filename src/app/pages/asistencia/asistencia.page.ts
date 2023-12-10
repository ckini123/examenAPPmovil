import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AsistenciaStorageService } from 'src/app/services/asistencia-storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencia = new FormGroup(
    {
      codigo : new FormControl('',[]),
      fechaClase : new FormControl('',[]),
      codigoAsignatura : new FormControl('',[]),
      rut_alumnos : new FormControl('',[])
    }
  )

  asistencias : any[] = [];
  KEY : string = "asistencias"

  constructor(private asistenciaStorage : AsistenciaStorageService) { }

  ngOnInit() {
  }

  async crearAsistencia(){
    let resp: boolean = await this.asistenciaStorage.agregarAsistencia(this.asistencia.value, this.KEY)
    if(resp){
      alert("Asistencia agregada!")
    } else{
      alert("Ha ocurrido un error!")
    }
  }
  
}
