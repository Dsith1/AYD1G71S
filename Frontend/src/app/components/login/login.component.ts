import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public service: UsuarioService, public router: Router) { }

  ngOnInit(): void {
  }
  public error=false;
 
  username: string="JorgeS"; 
  password: string="1234";
  decoded: any = [];
  respuesta: any = [];
  roles: any=[];
  token: string ="";
  datos = {
    Username: '',
    Password: ''
  };
  userNameCorrecto(username: string): string {
    if(username.length >= 4 && username.length <=15)
    {
      return 'Cumple con el rango'
    }
    
    return 'No cumple con el rango';
  }
  logearse(){
    this.datos.Username = this.username;
    this.datos.Password = this.password;
    if(this.userNameCorrecto(this.username)=="Cumple con el rango"){
     
      console.log(this.datos.Username);
      console.log(this.datos.Password);
      this.service.login(this.datos).subscribe(res => {
        this.respuesta = res; 
        console.log(this.respuesta);
        if(this.respuesta.token != "")
        {
          this.error=false;       
          this.almacenar();   
        }
      },
      err => {this.error=true; 
      this.almacenar(); }      
    )
      }
  }

  ObtenerDatos(){
    if(!this.error){
       this.decoded = jwt_decode(this.respuesta.token);       
       return true;
    }else {
      return false ;
    }
  }
  almacenar()
  {
    if(this.ObtenerDatos()){
   // localStorage.setItem('llave',this.token);
    this.router.navigate(['/principal']);
    localStorage.setItem('CodigoUsuario',this.decoded.user.CodigoUsuario);
    localStorage.setItem('Username',this.decoded.user.Username);
    localStorage.setItem('Nombres',this.decoded.user.Nombres);
    localStorage.setItem('Apellidos',this.decoded.user.Apellidos);
    localStorage.setItem('Correo',this.decoded.user.Correo);
    localStorage.setItem('Password',this.decoded.user.Password);
    localStorage.setItem('Fecha_Nac',this.decoded.user.Fecha_Nacimiento);
    localStorage.setItem('Rol',this.decoded.user.rol);
    }else {
      alert("USUARIO INCORRECTO");
    }
  }

}
