import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Estado } from 'src/app/models/producto';

@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.component.html',
  styleUrls: ['./modificar-pedido.component.scss']
})
export class ModificarPedidoComponent implements OnInit {

  constructor(public SProductos:ProductoService,public router: Router) { }

  est: string ="Estado";
  listaestados : Estado[]=[];
  
  Nombres: string;
  habilitacion: string;

  id: string = "";
  username:  string = "";
  nombres :string="";
  apellidos: string="";
  fecha_venta: string = "";
  estado:  number;

  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');
    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a>  <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a>"; 
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }

    this.SProductos.obtenerEstados().subscribe((res:any[])=>{
      console.log(res);
      this.listaestados=res;
    })

    this.id = localStorage.getItem('numero_pedido');
    this.nombres = localStorage.getItem('nombres');
    this.apellidos = localStorage.getItem('apellidos');
    this.username = localStorage.getItem('username');
    this.fecha_venta = localStorage.getItem('fecha_venta');
    this.estado = Number(localStorage.getItem('estado'));

  }

  EligeEstado(idestado:number){
    this.estado = Number(idestado);
    for (const x of this.listaestados) {
      if(x.id==idestado){
        this.est=x.estado;
      }
    }
  }

  Actualizar(){
    console.log("se va a modificar a " + this.id)
    this.SProductos.updatePedido(this.id , this.estado)
    .subscribe((res)=>{
      console.log("ya modifico");
      console.log(res);     
      alert("El pedido fue actualizado exitosamente");
      this.router.navigate(['/adminPedidos']);
    })
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
