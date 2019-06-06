import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { Error404Component } from './componentesgenerales/error404/error404.component';
import { ClearMenuResolve } from './services/clearMenu.resolve';

const appRoutes: Routes = [
  {
    path: 'docentes',
    loadChildren: () => import('./publico/publico.module').then(m => m.PublicoModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cambiarclave',
    loadChildren: () => import('./cambiar-clave/cambiar-clave.module').then(m => m.CambiarClaveModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'modulos',
    loadChildren: () => import('./modulos/modulos.module').then(m => m.ModulosModule),
    canActivate: [AuthGuardService],
    resolve: {
      clear: ClearMenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        onSameUrlNavigation: 'reload',
        useHash: true
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
