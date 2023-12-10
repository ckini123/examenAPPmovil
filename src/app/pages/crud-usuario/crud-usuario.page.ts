import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.page.html',
  styleUrls: ['./crud-usuario.page.scss'],
})
export class CrudUsuarioPage implements OnInit {

  usuario = new FormGroup(
    {
      rut : new FormControl('', [
                                Validators.required,
                                Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]')
                              ]),

      nombre : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(3)
                                  ]),

      ap_paterno : new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),

      ap_materno : new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),

      fecha_nacimiento : new FormControl('', [Validators.required]),

      correo  : new FormControl('', [
                                    Validators.required,
                                    Validators.pattern('[a-zA-Z.]+@+(duocuc.cl)')
                                  ]),
      
      tipo_usuario : new FormControl('alumno', [Validators.required]),

      clave_1 : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(20),
                                    Validators.pattern('[0-9a-zA-Z._]{6,20}')
                                    ]),

      clave_2 : new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(6),
                                    Validators.maxLength(20),
                                    Validators.pattern('[0-9a-zA-Z._]{6,20}')
      ])
    }
  )

  usuarios : any[] = [];
  KEY : string = 'usuarios';

  constructor(private usuarioStorage : UsuarioStorageService,
              private firebase : FirebaseService) { }

  async ngOnInit() {
    await this.listar();
  }
  
  //métodos del formulario:
  async listar(){
    this.usuarios = await this.usuarioStorage.listar(this.KEY);
  }

  async guardar(){
    var resp:boolean = await this.usuarioStorage.agregar(this.usuario.value, this.KEY);
    if(resp){
      this.firebase.agregar('usuarios',this.usuario.value)
      alert("Usuario agregado");
      await this.listar();
    }else{
      alert("No Se Guardo")
    }
  }
  
  async eliminar(rutEliminar: string){
    await this.usuarioStorage.eliminar(rutEliminar, this.KEY);
    await this.listar();
    alert("Usuario eliminado!");
  }

  async buscar(rutBuscar: string){
    var usuarioEncontrado: any = await this.usuarioStorage.buscar(rutBuscar, this.KEY);
    this.usuario.setValue(usuarioEncontrado);
  }

  async modificar(){
    var resp: boolean = await this.usuarioStorage.modificar(this.usuario.value, this.KEY);
    if(resp){
      alert("Usuario modificado!");
      await this.listar();
    }else{
      alert("Usuario Inexsistente!");
    }
  }

}
