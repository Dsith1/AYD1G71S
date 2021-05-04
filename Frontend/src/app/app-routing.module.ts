import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';

import { AdministrarUsuarioComponent } from './components/administrar-usuario/administrar-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
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


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'modificarUsuario',
    component: ModificarUsuarioComponent,
  },
  {
    path: 'administrarUsuario',
    component: AdministrarUsuarioComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'administrarProveedor',
    component: AdministrarProveedorComponent,
  },
  {
    path: 'registroProveedor',
    component: RegistroProveedorComponent,
  },
  {
    path: 'verProveedores',
    component: VerProveedoresComponent,
  },
  {
    path: 'agregarProducto',
    component: AgregarProductoComponent,
  },
  {
    path: 'administrarProducto',
    component: AdministrarProductoComponent,
  },
  {
    path: 'VerProductosAdmin',
    component: VerProductoComponent,
  },
  {
    path: 'VerProductosCliente',
    component: ProductosClientesComponent,
  },
  {
    path: 'Comprar',
    component: ComprarComponent,
  },
  {
    path: 'adminPedidos',
    component: AdminPedidosComponent  ,
  },
  {
    path: 'modificarPedido',
    component: ModificarPedidoComponent  ,
  },
  {
    path: 'misPedidos',
    component: MisPedidosComponent  ,
  },
  {
    path: 'ReporteStock',
    component: ReporteStockComponent  ,
  },
  {
    path: 'ProductoMasVendido',
    component: ReporteMasVendidoComponent  ,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
