import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulosComponent } from './modulos.component';

const routesModule: Routes = [
  {
    path: '',
    component: ModulosComponent,
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModule)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
