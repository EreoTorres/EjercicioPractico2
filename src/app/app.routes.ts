import { Routes } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { NewventaComponent } from './newventa/newventa.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditclienteComponent } from './editcliente/editcliente.component';
import { ArituclosComponent } from './arituclos/arituclos.component';
import { EditarticuloComponent } from './editarticulo/editarticulo.component';
import { CuponesComponent } from './cupones/cupones.component';
import { EditcuponesComponent } from './editcupones/editcupones.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

export const ROUTES: Routes = [
    {path: 'ventas', component: VentasComponent,data: {title: 'Ventas',icon: 'point_of_sale',tipo: 'menu'}},
    {path: 'clientes', component: ClientesComponent,data: {title: 'Clientes',icon: 'groups',tipo: 'menu'}},
    {path: 'articulos', component: ArituclosComponent,data: {title: 'Articulos',icon: 'local_grocery_store',tipo: 'menu'}},
    {path: 'cupones', component: CuponesComponent,data: {title: 'Cupones',icon: 'confirmation_number',tipo: 'menu'}},
    {path: 'configuracion', component: ConfiguracionComponent,data: {title: 'Configuracion',icon: 'settings',tipo: 'menu'}},
    {path: 'nventa', component: NewventaComponent,data: {title: 'Nueva Venta',tipo: 'ventana'}},
    {path: 'ncliente', component: EditclienteComponent,data: {title: 'Nuevo CLiente',tipo: 'ventana'}},
    {path: 'narticulo', component: EditarticuloComponent,data: {title: 'Nuevo Articulo',tipo: 'ventana'}},
    {path: 'ncupones', component: EditcuponesComponent,data: {title: 'Nuevo Cupon',tipo: 'ventana'}},
    {path: '', pathMatch:'full', redirectTo:'ventas',data: {tipo: 'validacion'} },
    {path: '**', pathMatch:'full', redirectTo:'ventas',data: {tipo: 'validacion'} }
];
