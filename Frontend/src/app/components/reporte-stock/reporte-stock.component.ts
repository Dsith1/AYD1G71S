import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto , StockProducto} from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-reporte-stock',
  templateUrl: './reporte-stock.component.html',
  styleUrls: ['./reporte-stock.component.scss']
})
export class ReporteStockComponent implements OnInit {

  Nombres: string;
  VectorProductos: StockProducto[] =[];
  headElements = ['Nombre Producto', 'Cantidad','Precio Venta','Precio Compra'];
  habilitacion: string;
  idc: number;
  constructor(public router:Router, public Producto:ProductoService) { }

  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');

    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a>  <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }

    this.Producto.StockProductos().subscribe((res:any[])=>{
      this.VectorProductos=res;
      console.log(this.VectorProductos);
    })
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
 

}
