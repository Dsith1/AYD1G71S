import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.scss']
})
export class VerProductoComponent implements OnInit {

  constructor(public router:Router, public Producto:ProductoService) { }
  Nombres: string;
  VectorProductos: Producto[] =[];
  headElements = ['Nombre Producto', 'Descripción', 'Cantidad','Precio Venta','Precio Compra','Detalles'];
  habilitacion: string;
  idc: number;
  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');

    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a>  <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }

    this.Producto.obtenerPedidos().subscribe((res:any[])=>{
      this.VectorProductos=res;
     // console.log(this.Usuarios[0].dpi);
    })
  }
  Modifica(id : number):boolean{
    for (const Vector of this.VectorProductos) {
      if(Vector.id==id){
        this.idc=Vector.id;
        return true;
      }
    }
    return false;
  }

  AModificar(id: number){
    if(this.Modifica(id)){
      localStorage.setItem('id_producto',""+this.VectorProductos[this.idc].id);
      localStorage.setItem('nombre_prod',this.VectorProductos[this.idc].nombre_prod);
      localStorage.setItem('descripcion',this.VectorProductos[this.idc].descripcion);
      localStorage.setItem('cantidad',""+this.VectorProductos[this.idc].cantidad);
      localStorage.setItem('precio_compra',this.VectorProductos[this.idc].precio_compra+"");
      localStorage.setItem('precio_venta',this.VectorProductos[this.idc].precio_venta+"");
      localStorage.setItem('categoria',this.VectorProductos[this.idc].categoria+"");
      this.router.navigate(['/administrarProducto']); //acá va la página de modificación 
    }
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
