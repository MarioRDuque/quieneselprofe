import { NgModule } from '@angular/core';

import { SuscripcionRoutingModule } from './suscripcion-routing.module';
import { SuscripcionComponent } from './suscripcion.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../services/util.service';

@NgModule({
  declarations: [SuscripcionComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    SuscripcionRoutingModule
  ],
  providers: [
    UtilService
  ]
})
export class SuscripcionModule { }
