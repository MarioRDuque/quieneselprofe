import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Error404Component } from './componentesgenerales/error404/error404.component';
import { ClearMenuResolve } from './services/clearMenu.resolve';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastNoAnimationModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuardService, ClearMenuResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
