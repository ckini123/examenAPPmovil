import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo : string = "";
  clave_1 : string = "";
  cantidad: number =0;
  pokemon: any = '';
  nombrepokemon: string="";
 

  admin: any = {
    rut: '21438692-5',
    nombre: 'Claudio',
    ap_paterno : 'Canales',
    ap_materno : 'Cerda',
    correo: 'cl.canales@duocuc.cl',
    fecha_nacimiento: '2003-11-04',
    tipo_usuario: 'administrador',
    clave_1: 'Claudio123',
    clave_2: 'claudio123'
  }

  docente: any = {
    rut: '20782958-7',
    nombre: 'benjamin',
    ap_paterno : 'canales',
    ap_materno : 'cerda',
    correo: 'be.canales@duocuc.cl',
    fecha_nacimiento: '2001-07-02',
    tipo_usuario: 'docente',
    clave_1: 'benjamin123',
    clave_2: 'benjamin123'
  }
  

  constructor(private usuarioStorage : UsuarioStorageService,
              private router : Router,
              private pokeapi: PokeapiService,
              private firebase: FirebaseService) { }


  fecha:Date = new Date();

  async ngOnInit() {
    await this.usuarioStorage.agregar(this.admin, 'usuarios');
    await this.usuarioStorage.agregar(this.docente, 'usuarios');
    this.consumirApi();
  }

  consumirApi(){
    this.pokeapi.getDatos().subscribe((resp:any) => {
      console.log(resp);
      let x = Math.round(Math.random() * 20);
      console.log(x)
      this.nombrepokemon=resp.results[x].name;
      this.cantidad=resp.count; 
      this.pokemon =resp.results[0].url;
      console.log(this.pokemon);
    })
  }
  
  //Método para loguear:
  async ingresar(){
    var usuario_encontrado: any = await this.usuarioStorage.login(this.correo, this.clave_1, 'usuarios');
    if(usuario_encontrado != undefined){
      //ELEMENTO NUEVO PARA EL LOGIN:
      var navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      };
      if(usuario_encontrado.tipo_usuario == "administrador"){
        this.router.navigate(['/home'], navigationExtras);
      } else if(usuario_encontrado.tipo_usuario == "docente"){
        this.router.navigate(['/home'], navigationExtras);
      } else if(usuario_encontrado.tipo_usuario == "alumno"){
        this.router.navigate(['/home'], navigationExtras);
      }

    }else{
      alert("El usuario o la Contraseña Son Incorrectos");
    }
  }
  mapa(){
    this.router.navigate(['/mapa'])
  }
}
