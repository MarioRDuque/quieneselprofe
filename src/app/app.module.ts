import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Error404Component } from './componentesgenerales/error404/error404.component';
import { ClearMenuResolve } from './services/clearMenu.resolve';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiRequestService } from './services/api-request.service';
import { AuthService } from './services/auth.service';
import { AppConfig } from './services/app-config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastNoAnimationModule.forRoot(),
    NgbModule.forRoot(),
    HttpClientModule,
    ScrollToModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuardService,
    ClearMenuResolve,
    AuthService,
    ApiRequestService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
