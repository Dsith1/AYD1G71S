import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto, UltimaV } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  constructor(public router:Router, public Producto:ProductoService) { }

  idventa : number=0;
  total : number=0;
  Nombres: string;
  VectorPComprar: Producto[]=[];
  VectorProductos2: Producto[] =[];
  VectorProductos: Producto[] =[];
  headElements = ['Nombre Producto', 'Descripción', 'Cantidad','Precio'];
  habilitacion: string;
  contador:number;
  Producto_Cantidad : number[][] =[]; //id producto, cantidad
  direccion: string ;
  listadir = [];
  d = "Elige tu dirección...";
  existeDireccion = false;
  
  ngOnInit(): void {
    this.Nombres=localStorage.getItem('Nombres');
    this.habilitacion=localStorage.getItem('Rol');
    this.contador = Number(localStorage.getItem("contadorp"));
    if (this.habilitacion =="1"){
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarUsuario\" >Admin Usuarios</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar mis datos</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"verProveedores\" >Ver Proveedores</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"registroProveedor\" >Agregar Proveedor</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"administrarProveedor\" >Admin Proveedor</a> <div class=\"dropdown-divider\"></div>    <a class=\"dropdown-item\"  href=\"agregarProducto\" >Agregar Producto</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ReporteStock\" >Stock Productos</a>";
      this.habilitacion+="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"ProductoMasVendido\" >Producto Más Vendido</a>";
    }else{
      this.habilitacion="<div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"modificarUsuario\" >Modificar Datos</a> <div class=\"dropdown-divider\"></div><a class=\"dropdown-item\" href=\"VerProductosCliente\" >Productos</a> ";
    }
    
    this.VectorProductos2 =JSON.parse(localStorage.getItem("PRODUCTOS"));
    this.VectorProductos =JSON.parse(localStorage.getItem("PRODUCTOS"));
    this.Producto_Cantidad =JSON.parse(localStorage.getItem("VectorProducto_C"));
   // console.log("AAAAA");
    //console.log(this.Producto_Cantidad);
   this.ProductosComprar();
   this.CargarDirecciones();
  }
  ProductosComprar(){
    for (const productoc of this.Producto_Cantidad) {     
      //console.log(productoc); 
      for (const p of this.VectorProductos2) {
       // console.log(p);
          if(productoc[0]==p.id){
            p.cantidad=productoc[1];
            this.VectorPComprar.push(p);
            this.total=this.total +productoc[1] * p.precio_venta;
          //  console.log(this.VectorPComprar);
          }
      }
    }
  }

  Comprar(){
    if(this.existeDireccion == false){
      this.RegistrarDireccion(Number(localStorage.getItem("CodigoUsuario")), this.direccion);
    }
    //1. Verifcar que exista la cantidad del producto deseado 
    if(this.VectorPComprar.length==this.VerificarTodos()){ 
      //significa que existen todas las cantidades que se necesitan 
      //registramos la venta
      let id: number = Number(localStorage.getItem("CodigoUsuario"));
      this.Producto.CrearVenta(id, this.direccion).subscribe( res => {
        //alert("Se registró correctamente la venta");
         },
         err => {  alert("No se pudo registrar la venta"); }      
        );

      //obtener ultima venta
      this.Producto.ObtenerUltimaVenta().subscribe((res:UltimaV)=>{       
        this.idventa =res.id;
        this.FinCompra(this.idventa);
      });
      
    }else {
      alert("No hay suficiente producto para su compra.");
    }
  }

  RegistrarDireccion(id:number, direccion:string){
    if(this.direccion != ""){
      this.Producto.CrearDireccion(id, direccion)
      .subscribe((res)=>{  
        alert("DIRECCIÓN REGISTRADA CON ÉXITO");
      },
      err => {alert("NO SE PUDO REGISTRAR LA DIRECCION")}  
      )
    } else {
      alert("Ingrese una dirección de entrega");
    }
  }

  CargarDirecciones(){
    this.Producto.getDirecciones(localStorage.getItem("CodigoUsuario")).subscribe((res:any[])=>{
      this.listadir=res;
      console.log(this.listadir);
    })
  }

  FinCompra(idv:number){
      // llenar los detalles 
      let contador=0;
      for (const producto of this.VectorPComprar) {   
        console.log("id venta: "+idv+producto.id+producto.nombre_prod+" cantidad: "+producto.cantidad);    
        this.Producto.DetalleVenta(idv,producto.id,producto.cantidad).subscribe( res => {
           
           },
           err => { contador++;  }      
          )
      }
      console.log(contador);
      if(contador>0){
        alert("No se pudo registrar la compra");
      }else {       
        alert("Su compra se registró correctamente");
      }
  }
  VerificarTodos():number{
    let cuenta:number=0;
    for (const prod of this.Producto_Cantidad) {
      if(this.VerificaCantidadStock(prod[0],prod[1])){
        cuenta++;
      }
    }
    return cuenta;
  }
  VerificaCantidadStock(id:number, cantidad: number):boolean{
    for (const prod of this.VectorProductos) {
      if(prod.id == id ){  
        //console.log("hola"+ id + prod.id);  
        //console.log("stock: "+ prod.cantidad + " cantidad: "+cantidad) ;
        if(prod.cantidad > cantidad){ 
        return true;
        }
      }
    }
    return false;
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  EligeDireccion(iddireccion){
    //this.direccion = iddireccion ;
    for (const x of this.listadir) {
      if(x.id==iddireccion){
        this.d=x.direccion;
        this.existeDireccion = true;
        this.direccion = this.d;
        console.log("Cambio direccion: "+ true);
      }
    }
  }

  cambiarTexto(){
    this.existeDireccion = false;
    console.log("Cambio direccion: "+ false);
  }

}
