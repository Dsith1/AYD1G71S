import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  Nombres: string;
  habilitacion: string;
  
  constructor(
      private user:UsuarioService,public router: Router
    ) { }

  nombre: string="";
  password: string="";
  apellidos: string=""; 
  correo: string="";
  telefono: string="";
  foto: string=""; 
  genero: string="";
  fechanac: string="";
  direccion: string="";
  username : string="";
  uploadedFiles: Array <File>;
  fotografia: string="";

  ngOnInit(): void {
    this.username = localStorage.getItem('Username');
    console.log(this.username);
    if (this.username != "") {
      this.user.getUsuario(this.username).subscribe((res)=>{
        let u = (res['user']);
        this.nombre = u['Nombres'];
        this.apellidos = u['Apellidos'];
        this.correo = u['Correo'];
        this.password = u['Password'];
        this.genero = u['Genero'];
        this.fechanac = u['Fecha_Nacimiento'].substring(0, 10);
        console.log(u);
      })
    }
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');

    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>  <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"VerProductosAdmin\" >Admin Producto</a>";   
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
      this.habilitacion+="<div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"VerProductosCliente\" >Productos</a>";
    }
  }

  modificar(){
    this.user.update(this.username,this.nombre,this.apellidos,this.correo,this.password,this.genero, this.fechanac)
    .subscribe((res)=>{
      //console.log("ya modifico");
      //console.log(res);      
    })
  }

  Genero(tipo:string){
    if(tipo=="m"){
      this.genero='M';
    }else if(tipo=="f"){
      this.genero='F';
    }
  }


  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
