import { RouterModule, Routes } from '@angular/router';

import { IdentificarComponent } from './components/identificar/identificar.component';
import { ListadoComponent } from './components/listado/listado.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

const APP_ROUTES: Routes = [
  { path: 'identificar',  component: IdentificarComponent},
  { path: 'listado',  component: ListadoComponent},
  { path: 'ayuda',  component: AyudaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'identificar' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
