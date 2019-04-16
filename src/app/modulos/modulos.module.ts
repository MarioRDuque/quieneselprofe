import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysService } from 'angular2-hotkeys';
import { ModulosRoutingModule } from './modulos-routing.module';
import { ModulosComponent } from './modulos.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../shared/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    ModulosRoutingModule
  ],
  declarations: [
    ModulosComponent
  ],
  providers: [
    HotkeysService
  ]
})
export class ModulosModule { }
