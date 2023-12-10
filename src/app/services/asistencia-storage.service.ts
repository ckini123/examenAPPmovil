import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaStorageService {

  // Variables
  asistencias : any [] = [];

  constructor(private storage : Storage) {
    this.storage.create();
   }

   async buscarAsistencia(codigoAsistencia: string,key : string): Promise<any>{
    this.asistencias = await this.storage.get(key)||"";
    return this.asistencias.find(asistencia => asistencia.codigo == codigoAsistencia);
   }

   async agregarAsistencia(asistencia : any ,key: string) :Promise<any>{
    this.asistencias = await this.storage.get(key)||"";
    let asistenciaEncontrada = this.buscarAsistencia(asistencia.codigo, key);
    if(asistenciaEncontrada!= undefined){
      this.asistencias.push(asistencia)
      await this.storage.set(key, this.asistencias);
      return true;
    }
    return false;
   }
}
