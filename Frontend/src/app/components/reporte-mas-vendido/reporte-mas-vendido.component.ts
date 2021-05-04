import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoVendido , StockProducto} from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-reporte-mas-vendido',
  templateUrl: './reporte-mas-vendido.component.html',
  styleUrls: ['./reporte-mas-vendido.component.scss']
})
export class ReporteMasVendidoComponent implements OnInit {

  constructor(public router:Router, public Producto:ProductoService) { }
  Nombres: string;
  mes : string;
  numeroanio: string;
  habilitacion: string;
  VectorProductos: ProductoVendido[] =[];
  headElements = ['Nombre Producto', 'Cantidad Vendida','Total Percibido'];
  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');

    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a>  <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
    }else{
      this.habilitacion="";
    }
  }

  Buscar(){
    this.Producto.ProductoMasVendidoMes(Number(this.mes),Number(this.numeroanio)).subscribe((res:any[])=>{
      this.VectorProductos=res;
     console.log(this.VectorProductos);
    })
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
