import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiRequestService } from '../services/api-request.service';
import { AppConfig } from '../services/app-config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ApiRequestService,
    AppConfig
  ]
})
export class SharedModule { }
