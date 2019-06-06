import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulosComponent } from './modulos.component';

const routesModule: Routes = [
  {
    path: '',
    component: ModulosComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesModule)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
