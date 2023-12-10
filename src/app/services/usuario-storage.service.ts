import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//1. importar Storage:
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  usuarios: any[] = [];
  estado_login: boolean = false;

  constructor(private storage: Storage,
              private router : Router) {

                storage.create()
               }

  // METODOS
  
  //buscar: que buscar y donde buscarlo.
  async buscar(rut: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios.find(usuario => usuario.rut == rut);
  }

  // Buscar por correo
  async buscarCorreo(correo: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key)||[];
    return this.usuarios.find(usuario => usuario.correo == correo)
  }

  //agregar: que agregar y donde agregarlo.
  async agregar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let usuarioEncontrado = await this.buscar(usuario.rut, key);
    if(usuarioEncontrado == undefined){
      this.usuarios.push(usuario);
      await this.storage.set(key, this.usuarios);
      return true;
    }
    return false;
  }

  //actualizar:
  async modificar(usuario: any, key: string): Promise<boolean>{
    this.usuarios = await this.storage.get(key) || [];
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    if(index == -1){
      return false;
    }
    this.usuarios[index] = usuario;
    await this.storage.set(key, this.usuarios);
    return true;
  }

  //eliminar:
  async eliminar(rut: string, key: string): Promise<boolean>{
    var resp: boolean = false;
    this.usuarios = await this.storage.get(key) || [];
    this.usuarios.forEach((usuario, index) => {
      if(usuario.rut == rut){
        this.usuarios.splice(index,1);
        resp = true;
      }
    });
    await this.storage.set(key, this.usuarios);
    return resp;
  }

  //listar:
  async listar(key: string): Promise<any[]>{
    this.usuarios = await this.storage.get(key) || [];
    return this.usuarios;
  }

  //método para loguear:
  async login(correo: string, clave: string, key: string): Promise<any>{
    this.usuarios = await this.storage.get(key) || [];
    var usuarito: any = this.usuarios.find(usu => usu.correo == correo && usu.clave_1 == clave);
    if(usuarito != undefined){
      this.estado_login = true;
      return usuarito;
    }
    return undefined;
  }

  logout(){
    this.estado_login = false;
    this.router.navigate(['/login'])
  }

  getEstadoLogin(): boolean{
    return this.estado_login;
  }

  validarEdad(fechaNac: Date): boolean{
    let dateMin: Date = new Date("1958-12-31");
    let dateMax: Date = new Date("2006-12-31");
    if(fechaNac.getFullYear() >= dateMin.getFullYear() && fechaNac.getFullYear() <= dateMax.getFullYear()){
      return true;
    }else{
      return false;
    }

  }
}
