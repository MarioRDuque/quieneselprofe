import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
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
