import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuscripcionComponent } from './suscripcion.component';

const routesSuscripcion: Routes = [
  {
    path: '',
    component: SuscripcionComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesSuscripcion)],
  exports: [RouterModule]
})
export class SuscripcionRoutingModule { }
