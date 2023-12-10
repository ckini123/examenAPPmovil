import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { AsistenciaStorageService } from 'src/app/services/asistencia-storage.service';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  KEY : string = "asignaturas"
  asignaturas : any[] = [];
  usuario : any[] = [];
  rut_usuario : string = "";

  constructor(private asignaturaService : AsignaturaService,
              private asistenciaStorage : AsistenciaStorageService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private clasesServices : ClasesService) { }

  async ngOnInit() {
    await this.listar()
    this.rut_usuario = this.activatedRoute.snapshot.paramMap.get("id") || " ";;
  }
  generarCodigoUnico(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }

    return codigo;
  }
  async listar(){
    this.asignaturas = await this.asignaturaService.listar(this.KEY);
  }
  generarClase(codigoAsig : string){
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();
    let fecha = dia + "/" + mes + "/" + anio;
    let clase : any  = {
      codigo : this.generarCodigoUnico(6),
      fecha_clase : fecha,
      codigo_asig : codigoAsig,
      rut_alumnos : []
    }
    this.clasesServices.agregar(clase, 'clases')
  }
}
