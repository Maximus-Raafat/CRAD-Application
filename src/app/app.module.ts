import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Management-Application/Shared/shared.module';
import { TaskDetailsComponent } from './Management-Application/Features/Task/task-details/task-details.component';
import { TaskFormComponent } from './Management-Application/Features/Task/task-form/task-form.component';
import { TaskListComponent } from './Management-Application/Features/Task/task-list/task-list.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { Card } from 'primeng/card';
import { Select } from 'primeng/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Checkbox } from 'primeng/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ButtonModule,
    Card,
    Select,
    Checkbox
  ],
  providers: [
    providePrimeNG({ 
        theme: {
            preset: Aura
        }
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
