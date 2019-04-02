import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeysService, HotkeyModule } from 'angular2-hotkeys';
import { ModulosRoutingModule } from './modulos-routing.module';
import { ModulosComponent } from './modulos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ModulosComponent],
  imports: [
    CommonModule,
    SharedModule,
    HotkeyModule.forRoot(),
    ModulosRoutingModule
  ],
  providers: [
    HotkeysService
  ]
})
export class ModulosModule { }
