import { NgModule } from '@angular/core';

import { SuscripcionRoutingModule } from './suscripcion-routing.module';
import { SuscripcionComponent } from './suscripcion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UtilService } from 'src/app/services/util.service';

@NgModule({
  declarations: [SuscripcionComponent],
  imports: [
    SharedModule,
    SuscripcionRoutingModule
  ],
  providers: [
    UtilService
  ]
})
export class SuscripcionModule { }
