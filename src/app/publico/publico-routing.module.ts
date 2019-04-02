import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from './publico.component';

const routesPublico: Routes = [
  {
    path: '',
    component: PublicoComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesPublico)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
