import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {

  constructor(public SProductos:ProductoService,public router: Router) { }
  
    categorias: boolean=false;
    cat: string ="Categoría";
    listacat : Categoria[]=[];
    Nombres: string;
    habilitacion: string;
    nombre_prod :string="";
    descripcion: string="";
    cantidad:  number;
    precio_compra: number;
    precio_venta:  number;
    categoria:  number;

  headElements = ['Nombre Proveedor', 'Dirección', 'Telefono','Editar'];

  ProductoEnviar = {
    nombre_prod : '',
    descripcion:'',
    cantidad: 0,
    precio_compra: 0,
    precio_venta: 0,
    categoria: 0
  };

  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');
    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"VerProductosAdmin\" >Admin Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }
    this.existe_categoria();
    
  }

  existe_categoria(){
    this.SProductos.obtenerCategorias().subscribe((res:any[])=>{
      this.listacat=res;
      this.categorias= true;
    })
    this.categorias= false;
  }

  EnviarDato(){
    if(this.categorias){            
      this.ProductoEnviar.nombre_prod = this.nombre_prod;
      this.ProductoEnviar.descripcion = this.descripcion;
      this.ProductoEnviar.cantidad=Number(this.cantidad);
      this.ProductoEnviar.precio_venta=Number(this.precio_venta);
      this.ProductoEnviar.precio_compra=Number(this.precio_compra);
      this.ProductoEnviar.categoria=Number(this.categoria);    
    }
    this.Registrar(this.ProductoEnviar);
}

Registrar(ProductoEnviar2){
    this.SProductos.registro(ProductoEnviar2)
    .subscribe(
      res => {
      //console.log(res);
      alert("PRODUCTO REGISTRAD0");
      //console.log(this.respuesta.affectedRows);
      },
      err => { alert("PRODUCTO INCORRECTO");
     }
    )
}
    EligeCategoria(idcategoria:number){
      this.categoria = Number(idcategoria);
      for (const x of this.listacat) {
        if(x.id==idcategoria){
          this.cat=x.categoria;
        }
      }
    }

    
   Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
