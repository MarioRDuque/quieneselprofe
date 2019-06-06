import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiRequestService } from '../services/api-request.service';
import { AppConfig } from '../services/app-config';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { CardComponent } from './components/card/card.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { TabContentComponent } from './components/tabset/tab-content/tab-content.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { SwitchComponent } from './components/switch/switch.component';
import { PellEditorComponent } from './components/pell-editor/pell-editor.component';
import { AlertComponent } from './components/alert/alert.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    PellEditorComponent,
    AlertComponent,
    WeatherComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    CardComponent,
    FileTreeComponent,
    TodolistComponent,
    TabsetComponent,
    TabContentComponent,
    ProgressBarComponent,
    SwitchComponent,
    PellEditorComponent,
    AlertComponent,
    WeatherComponent,
    ProfileComponent
  ],
  providers: [
    AuthService,
    ApiRequestService,
    AppConfig
  ]
})
export class SharedModule { }
