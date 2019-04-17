import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulosComponent } from './modulos.component';

const routesModule: Routes = [
  {
    path: '',
    component: ModulosComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', loadChildren: './index/index.module#IndexModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModule)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
