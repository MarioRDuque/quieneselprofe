import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoComponent } from './publico.component';
import { LoginRoutingModule } from './publico-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ApiRequestService } from '../services/api-request.service';
import { SuscripcionService } from './suscripcion/suscripcion.service';

@NgModule({
  declarations: [PublicoComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiRequestService,
    SuscripcionService
  ]
})
export class PublicoModule { }
