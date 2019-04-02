import { NgModule } from '@angular/core';
import { CambiarClaveRoutingModule } from './cambiar-clave-routing.module';
import { CambiarClaveComponent } from './cambiar-clave.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CambiarClaveComponent],
  imports: [
    SharedModule,
    CambiarClaveRoutingModule
  ]
})
export class CambiarClaveModule { }
