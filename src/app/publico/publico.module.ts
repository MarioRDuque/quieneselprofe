import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoComponent } from './publico.component';
import { LoginRoutingModule } from './publico-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PublicoComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NgbModule.forRoot()
  ]
})
export class PublicoModule { }
