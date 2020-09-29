import { Routes } from '@angular/router';
import { ListprospectosComponent } from './listprospectos/listprospectos.component';
import { DetalleprospectoComponent } from './detalleprospecto/detalleprospecto.component';

export const ROUTES: Routes = [
    {path: 'listprospectos', component: ListprospectosComponent},
    {path: 'detalleprospecto', component: DetalleprospectoComponent},
    {path: '', pathMatch:'full', redirectTo:'listprospectos' },
    {path: '**', pathMatch:'full', redirectTo:'listprospectos' }
];
