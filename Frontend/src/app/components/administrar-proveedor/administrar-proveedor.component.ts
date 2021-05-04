import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-administrar-proveedor',
  templateUrl: './administrar-proveedor.component.html',
  styleUrls: ['./administrar-proveedor.component.scss']
})
export class AdministrarProveedorComponent implements OnInit {

  constructor(private proveedor:ProveedorService,public router: Router) { }
  Nombres: string;
  habilitacion: string;
  nombre: string="";
  direccion: string="";
  telefono: string=""; 
  nombre_contacto: string="";
  id: string="";

  ngOnInit(): void {
    this.id = localStorage.getItem('id_proveedor')
    this.nombre = localStorage.getItem('nombre_proveedor')
    this.direccion = localStorage.getItem('direccion_proveedor')
    this.telefono = localStorage.getItem('telefono_proveedor')
    this.nombre_contacto = localStorage.getItem('nombre_contacto')

    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');

    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"VerProductosAdmin\" >Admin Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }

  }

  limpiar(){
    this.nombre ="";
    this.direccion="";
    this.telefono=""; 
    this.nombre_contacto="";
  }

  darBajaProveedor(){
    this.proveedor.delete(this.id).subscribe(
      res => {
        console.log(res);
        this.limpiar();
      },
      err => console.error(err)
    );
  }

  modificar(){
    console.log("se va a modificar a " + this.id)
    this.proveedor.update(this.id,this.nombre,this.direccion,this.telefono,this.nombre_contacto)
    .subscribe((res)=>{
      console.log("ya modifico");
      console.log(res);      
    })
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
