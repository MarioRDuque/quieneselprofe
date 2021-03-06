import { NgModule } from '@angular/core';

import { SuscripcionRoutingModule } from './suscripcion-routing.module';
import { SuscripcionComponent } from './suscripcion.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { UtilService } from '../../services/util.service';
import { LayoutModule } from '../../shared/layout.module';
import { ApiRequestService } from '../../services/api-request.service';
import { SuscripcionService } from './suscripcion.service';

@NgModule({
  declarations: [SuscripcionComponent],
  imports: [
    SharedModule,
    LayoutModule,
    HttpClientModule,
    SuscripcionRoutingModule
  ],
  providers: [
    UtilService,
    ApiRequestService,
    SuscripcionService
  ]
})
export class SuscripcionModule { }
