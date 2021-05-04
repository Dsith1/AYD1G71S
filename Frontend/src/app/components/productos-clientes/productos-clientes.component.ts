import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos-clientes',
  templateUrl: './productos-clientes.component.html',
  styleUrls: ['./productos-clientes.component.scss']
})
export class ProductosClientesComponent implements OnInit {

  constructor(public router:Router, public Producto:ProductoService) { }
  Nombres: string;
  Producto_Cantidad : number[][] =[]; //id producto, cantidad
  ProductosElegidos : number []=[];
  VectorProductos: Producto[] =[];
  headElements = ['Nombre Producto', 'Descripción', 'Cantidad','Precio','Agregar al Carrito','Eliminar del carrito'];
  habilitacion: string;
  contador:number;

  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');
    this.contador = Number(localStorage.getItem("contadorp"));
    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar Datos</a> ";
    }

    this.Producto.obtenerProductos().subscribe((res:any[])=>{
      this.VectorProductos=res;
      localStorage.setItem('PRODUCTOS',JSON.stringify(this.VectorProductos));
    })
    
    this.Producto_Cantidad =JSON.parse(localStorage.getItem("VectorProducto_C"));
    if(this.Producto_Cantidad==null){
      this.Producto_Cantidad=[];
    }
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  AgregarCarrito(id: number){
    this.contador++;
    let cantidad =0;
    localStorage.setItem("contadorp",this.contador+"");
    if(this.VerificarCantidad(id)){
      for (const p of this.Producto_Cantidad) {
        if(p[0]==id){
          cantidad= p[1];
          cantidad++;
          p[1]=cantidad;
        }
      }
    }else {
      this.ProductosElegidos.push(id);
      this.Producto_Cantidad.push([id,1]);
    }
   // console.log(this.Producto_Cantidad); 
    localStorage.setItem('VectorProducto_C',JSON.stringify(this.Producto_Cantidad));
   
  }

  EliminarDelCarrito(id: number){
    
    let cantidad =0;
    
    if(this.VerificarCantidad(id)){
      var indice = 0;
      for (const p of this.Producto_Cantidad) {
        if(p[0]==id){
          //Globo con cantidad
          this.contador--;
          localStorage.setItem("contadorp",this.contador+"");
          
          //modificar la cantidad
          cantidad= p[1];
          cantidad--;
          p[1]=cantidad;
          if(p[1]==0){
            this.ProductosElegidos.splice(indice, 1);
            this.Producto_Cantidad.splice(indice, 1);
          }
        }
        indice++;
      }
    }else {
      alert('El producto no existe en el carrito');
    }
   // console.log(this.Producto_Cantidad); 
    localStorage.setItem('VectorProducto_C',JSON.stringify(this.Producto_Cantidad));
   
  }
 

  VerificarCantidad(id:number):boolean{
    for (const prod of this.ProductosElegidos) {
      if(prod == id ){      
        return true;
      }
    }
    return false;
  }
}
