import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

//const baseUrl = 'http://192.168.0.4:3000';
const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})

export class ProveedorService {

  constructor(private http: HttpClient) { }
  //para comunicarnos con json
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  RegistroProveedor(nombre: string,direccion: string,telefono: string,nombre_contacto: string) {
    //console.log(username,password);
    const url = baseUrl+"/prov/create";
    //comienza el post
    return this.http.post(
      url,
      {
        "nombre": nombre,
        "direccion": direccion,
        "telefono": telefono,
        "nombre_contacto": nombre_contacto,  
      },

      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  update(id : string, nombre: string,direccion: string,telefono : string,nombre_contacto: string) {
    
    const url = baseUrl+"/prov/updateProv";
    //comienza el put
    return this.http.put(
      url,
      {
        "id": id,
        "nombre": nombre,
        "direccion": direccion,
        "telefono": telefono,
        "nombre_contacto": nombre_contacto
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  delete(id:string){
    return this.http.delete(`${baseUrl}/prov/deleteProv/${id}`);
  }
  obtenerProveedores(){
    const url= baseUrl+"/prov/";
    return this.http.get(url);
  }
}
