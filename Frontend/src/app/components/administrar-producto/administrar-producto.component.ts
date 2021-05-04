import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria } from 'src/app/models/producto';

@Component({
  selector: 'app-administrar-producto',
  templateUrl: './administrar-producto.component.html',
  styleUrls: ['./administrar-producto.component.scss']
})
export class AdministrarProductoComponent implements OnInit {

  constructor(public SProductos:ProductoService,public router: Router) { }

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
  id: string = "";

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
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a>  <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a>"; 
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="";
    }

    this.SProductos.obtenerCategorias().subscribe((res:any[])=>{
      console.log(res);
      this.listacat=res;
    })

    this.id = localStorage.getItem('id_producto');
    this.nombre_prod = localStorage.getItem('nombre_prod');
    this.descripcion = localStorage.getItem('descripcion');
    this.cantidad = Number(localStorage.getItem('cantidad'));
    this.precio_compra = Number(localStorage.getItem('precio_compra'));
    this.precio_venta = Number(localStorage.getItem('precio_venta'));
    this.categoria = Number(localStorage.getItem('categoria'));

  }

  EligeCategoria(idcategoria:number){
    this.categoria = Number(idcategoria);
    for (const x of this.listacat) {
      if(x.id==idcategoria){
        this.cat=x.categoria;
      }
    }
  }

  Actualizar(){
    console.log("se va a modificar a " + this.id)
    this.SProductos.update(this.id, this.nombre_prod,this.descripcion, this.cantidad,this.precio_compra , this.precio_venta, this.categoria)
    .subscribe((res)=>{
      console.log("ya modifico");
      console.log(res);     
      alert("El producto fue actualizado exitosamente");
      this.router.navigate(['/VerProductosAdmin']);
    })
  }

  Eliminar(){
    this.SProductos.delete(this.id).subscribe(
      res => {
        console.log(res);
        alert("El producto fue eliminado exitosamente");
        this.router.navigate(['/VerProductosAdmin']);
      },
      err => console.error(err)
    );
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
