import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { validateRut } from '@fdograph/rut-utilities';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
                                    Validators.pattern('[a-zA-Z]+@+(duocuc.cl)')
                                  ]),
      
      tipo_usuario : new FormControl('', [Validators.required]),

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
  tipo_usuario : boolean = true;

  constructor(private toastController : ToastController,
              private usuarioStorage : UsuarioStorageService,
              private router : Router,
              private fire: FirebaseService) { }

  ngOnInit() {
  }

  // Metodos de formulario  
  async guardar() {
    try {
      let fechastring = this.usuario.value.fecha_nacimiento || "";
      let fechaOk = moment(fechastring, "YYYY-MM-DD").toDate();

      if (this.usuarioStorage.validarEdad(fechaOk)) {
        if (validateRut(this.usuario.value.rut ||"")) {
          this.usuario.patchValue({
            tipo_usuario: 'alumno' 
          });

          var resp: boolean = await this.usuarioStorage.agregar(this.usuario.value, this.KEY);
          if (resp) {
            this.fire.agregar('usuarios', this.usuario.value);
            alert("Usuario agregado!");
          } else {
            alert("NO SE GUARDÓ!");
          }
        } else {
          alert('Rut no válido');
        }
      } else {
        alert('Edad no válida');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
  
  public iqualPassword(){
    var pass1 = this.usuario.value.clave_1||"";
    var pass2 = this.usuario.value.clave_2||"";
    if(pass1 !== pass2){
      this.alerta('bottom',"LAS CONTRASEÑAS NO COINCIDEN", 3000, 'danger');
    } else{
      this.guardar();
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
