import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { Error404Component } from './componentesgenerales/error404/error404.component';
import { ClearMenuResolve } from './services/clearMenu.resolve';

const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'cambiarclave',
    loadChildren: './cambiar-clave/cambiar-clave.module#CambiarClaveModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'modulos',
    loadChildren: './modulos/modulos.module#ModulosModule',
    canActivate: [AuthGuardService],
    resolve: {
      clear: ClearMenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
