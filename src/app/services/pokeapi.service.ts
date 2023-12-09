import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  URL: string ="https://pokeapi.co/api/v2/pokemon"

  constructor(private http: HttpClient) {}
  
  getDatos(){
    return this.http.get(this.URL);
  }

  getDato(id: number){
    return this.http.get(this.URL + '/' +id);
  }
}
