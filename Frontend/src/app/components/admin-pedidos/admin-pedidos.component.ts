import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoService } from 'src/app/services/producto.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.scss']
})
export class AdminPedidosComponent implements OnInit {

  constructor(public router:Router, public Producto:ProductoService) { }

  Nombres: string;
  VectorPedidos: Pedido[] =[];
  headElements = ['Numero Pedido', 'Username', 'Nombres','Apellidos','Fecha Pedido','Estado', 'Ver Pedido'];
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
      this.VectorPedidos=res;
      console.log(res);
     // console.log(this.Usuarios[0].dpi);
    })
  }

  Modifica(id : number):boolean{
    var i = 0;
    for (const Vector of this.VectorPedidos) {
      if(Vector.numero_pedido==id){
        //this.idc = Vector.numero_pedido;
        this.idc = i;
        return true;
      }
      i++;
    }
    return false;
  }

  AModificar(id: number){
    alert("modificar " + id);
    if(this.Modifica(id)){
      localStorage.setItem('numero_pedido',""+id);
      localStorage.setItem('nombres',""+this.VectorPedidos[this.idc].Nombres);
      localStorage.setItem('apellidos',""+this.VectorPedidos[this.idc].Apellidos);
      localStorage.setItem('username',""+this.VectorPedidos[this.idc].Username);
      localStorage.setItem('fecha_venta',""+this.VectorPedidos[this.idc].Fecha_Venta);
      localStorage.setItem('estado',""+this.VectorPedidos[this.idc].estado);
      this.router.navigate(['/modificarPedido']); //acá va la página de modificación 
    }
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
