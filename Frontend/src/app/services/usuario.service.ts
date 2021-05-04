import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

//const baseUrl = 'http://192.168.0.4:3000';
const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  constructor(private http: HttpClient) { }
  //para comunicarnos con json
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  singup(username : string, nombre: string,apellidos: string,correo : string, password: string ,genero: string,fechanac: string) {
    //console.log(username,password);
    //const url = "http://"+this.puerto+":3000/app/registro";

    const url = baseUrl+"/user/create";
    //comienza el post
    return this.http.post(
      url,
      {
        "Username": username,
        "Nombres": nombre,
        "Apellidos": apellidos,
        "Correo": correo,
        "Password": password,
        "Genero": genero,
        "Fecha_Nacimiento": fechanac,
        "rol":3    
      },

      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  update(username : string, nombre: string,apellidos: string,correo : string, password: string, genero: string,fechanac: string) {
    
      
    const url = baseUrl+"/user/update";
    //comienza el put
    return this.http.put(
      url,
      {
        "Username": username,
        "Nombres": nombre,
        "Apellidos": apellidos,
        "Correo": correo,
        "Password": password,
        "Genero": genero,
        "Fecha_Nacimiento": fechanac
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  delete(Username:string){
    return this.http.delete(`${baseUrl}/user/delete/${Username}`);
    //return this.http.delete(`http://${this.ip}/user/delete${username}`);
  }

  getUsuario(username :string){
    const url = baseUrl+"/user/getUsuario";
    //comienza el post
    return this.http.post(
      url,
      {
        "Username" : username
      },
      {
        headers: this.headers
      }
      ).pipe(map(data => data));
  }

    login(usuario){
      console.log(usuario);
      const url= baseUrl+"/user/log";
      return this.http.post(
        url,
        usuario,
        {
          headers:this.headers
        }
    ).pipe(map(data => data));
  }

}
