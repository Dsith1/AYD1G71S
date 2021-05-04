import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

//const baseUrl = 'http://192.168.0.4:3000';
const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })
  
  registro(producto){

    const url= baseUrl+"/products/create";
    return this.http.post(
      url,
      producto,
      {
        headers:this.headers
      }
    ).pipe(map(data => data));
  }

  obtenerCategorias(){
    const url= baseUrl+"/categoria/";
    return this.http.get(url);
  }

  update(id : string, nombre: string,descripcion: string, cantidad:Number, compra:Number, venta:Number, categoria:Number) { 
    const url = baseUrl +"/products/updateProd";
    //comienza el put
    return this.http.put(
      url,
      {
        "id": id,
        "nombre_prod": nombre,
        "descripcion": descripcion,
        "cantidad": cantidad,
        "precio_compra": compra,
        "precio_venta": venta,
        "categoria": categoria
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  delete(id:string){
    return this.http.delete(`${baseUrl}/products/deleteProd/${id}`);
  }

  obtenerProductos(){
    const url= baseUrl+"/products/";
    return this.http.get(url);
  }

 
  //***************************** VENTAS *********************************************** */

  CrearVenta(idU: number, direccion:string) { 
    const url = baseUrl +"/venta/crearVenta";
    //comienza el put
    return this.http.post(
      url,
      {
        "CodigoUsuario": idU,
        "Direccion": direccion
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  DetalleVenta(idventa: number,idp :number,cantidad:number) { 
    const url = baseUrl +"/venta/llenarDetalle";
    //comienza el put
    return this.http.post(
      url,
      {
        "id_venta":idventa,
        "id_producto":idp,
        "cantidad":cantidad
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  ObtenerUltimaVenta(){
    const url= baseUrl+"/venta/last";
    return this.http.get(url);
  }

  ObtenerTotalVenta(idU:number, idventa:number){
    const url= baseUrl+"/venta/valorTotal";
    return this.http.post(
      url,
      {
        "CodigoUsuario":idU,
        "id_venta":idventa        
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  obtenerPedidos(){
    const url= baseUrl+"/venta/pedidos";
    return this.http.get(url);
  }

  
  obtenerPedidoCliente(id:number){
    const url= baseUrl+"/venta/misPedidos";
    return this.http.post(
      url,
      {
        "CodigoUsuario":id     
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  obtenerEstados(){
    const url= baseUrl+"/venta/getEstadoPedidos";
    return this.http.get(url);
  }

  updatePedido(id : string, estado:Number) { 
    const url = baseUrl +"/venta/updatePedido";
    //comienza el put
    return this.http.put(
      url,
      {
        "id": id,
        "estado": estado
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  /*********************  REPORTES ******************** */
  StockProductos(){
    const url= baseUrl+"/products/stock";
    return this.http.get(url);
  }
  //  producto mas vendido por mes
  ProductoMasVendidoMes(mes: number, anio:number){
    const url= baseUrl+"/reporte/ventasmes";
    return this.http.post(
      url,
      {
        "mes":mes,
        "anio":anio  
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }
  /************************ DIRECCIONES *************************** */
  CrearDireccion(idU:number, direccion:string){
    const url = baseUrl + "/direccion/createDir";
    return this.http.post(
      url,
      {
        "CodigoUsuario":idU,
        "direccion":direccion
      },
      {
        headers: this.headers
      }
    ).pipe(map(data => data));
  }

  getDirecciones(id:string){
    return this.http.get(`${baseUrl}/direccion/?id=${id}`);
  }

  //************************************************************* */
}
