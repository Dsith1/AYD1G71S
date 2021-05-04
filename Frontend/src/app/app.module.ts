import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './components/home/home.component';

import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';

import { AdministrarUsuarioComponent } from './components/administrar-usuario/administrar-usuario.component';
import { FormsModule } from '@angular/forms';

import { RegistroComponent } from './components/registro/registro.component';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AdministrarProveedorComponent } from './components/administrar-proveedor/administrar-proveedor.component';
import { RegistroProveedorComponent } from './registro-proveedor/registro-proveedor.component';
import { VerProveedoresComponent } from './components/ver-proveedores/ver-proveedores.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';

import { AdministrarProductoComponent } from './components/administrar-producto/administrar-producto.component';

import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { ProductosClientesComponent } from './components/productos-clientes/productos-clientes.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { AdminPedidosComponent } from './components/admin-pedidos/admin-pedidos.component';
import { ModificarPedidoComponent } from './components/modificar-pedido/modificar-pedido.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { ReporteStockComponent } from './components/reporte-stock/reporte-stock.component';
import { ReporteMasVendidoComponent } from './components/reporte-mas-vendido/reporte-mas-vendido.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModificarUsuarioComponent,
    AdministrarUsuarioComponent,
    RegistroComponent,
    LoginComponent,
    PrincipalComponent,
    AdministrarProveedorComponent,
    RegistroProveedorComponent,
    VerProveedoresComponent,
    AgregarProductoComponent,
    AdministrarProductoComponent,
    VerProductoComponent,
    ProductosClientesComponent,
    ComprarComponent,
    AdminPedidosComponent,
    ModificarPedidoComponent,
    MisPedidosComponent,
    ReporteStockComponent,
    ReporteMasVendidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
