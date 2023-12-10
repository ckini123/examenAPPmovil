import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-crud-asignatura',
  templateUrl: './crud-asignatura.page.html',
  styleUrls: ['./crud-asignatura.page.scss'],
})
export class CrudAsignaturaPage implements OnInit {

  // Variables auxiliares
  codigo : string = "";
  nombre : string = "";
  rut_docente : string = "";
  KEY : string = "asignaturas"

  constructor(private asignaturaService : AsignaturaService,
              private toastController : ToastController,
              private firebase: FirebaseService) { }

  async ngOnInit() {
    await this.listar();
  }
  asignatura = new FormGroup({
    codigo : new FormControl('', [Validators.required]),
    nombre : new FormControl('', [Validators.required]),
    rut_docente : new FormControl('', [Validators.required])
  })

  asignaturas : any[] = [];

  // Metodos
  async listar(){
    this.asignaturas = await this.asignaturaService.listar(this.KEY);
  }

  async guardar(){
    let resp : boolean = await this.asignaturaService.agregar(this.asignatura.value, this.asignatura.value.codigo||"", this.KEY);
    if(resp){
      this.firebase.agregar('asignaturas', this.asignatura.value )
      this.alerta('bottom', 'ASIGNATURA REGISTRADA!', 3000, 'success');
      await this.listar()
    } else {
      this.alerta('bottom', 'ASIGNATURA NO REGISTRADA!', 3000, 'danger');
    }
  }

  async eliminar(codigoEliminar: string){
    this.firebase.eliminar('asignaturas', codigoEliminar)
    await this.asignaturaService.eliminar(codigoEliminar, this.KEY);
    await this.listar();
    alert("Asignatura eliminada!");
  }

  async buscar(codigoBuscar: string){
    var asignaturaEncontrado: any = await this.asignaturaService.buscar(codigoBuscar, this.KEY);
    this.asignatura.setValue(asignaturaEncontrado);
  }

  async modificar(){
    var resp: boolean = await this.asignaturaService.modificar(this.asignatura.value, this.KEY);
    if(resp){
      this.firebase.modificar('asignaturas', this.asignatura.value.codigo ||'',  this.asignaturas)
      alert("ASIGNATURA modificado!");
      await this.listar();
    }else{
      alert("ASIGNATURA NO EXISTE!");
    }
  }



  // Metodo para la tostada
  async alerta(position: 'top' | 'middle' | 'bottom', 
                    message: string,
                    duration: number,
                    color: 'danger'|'success'|'warning') {
    const toast = await this.toastController.create({
      message,
      duration: duration,
      position: position,
      color: color
    });

    await toast.present();
  }
}
