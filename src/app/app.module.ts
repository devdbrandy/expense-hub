import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DepartmentOverviewComponent,
  DepartmentTeamComponent,
  DialogAddDepartmentComponent,
  DialogAddUserComponent,
  FooterComponent,
} from './components';

import { UnallocatedEmployeesPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentOverviewComponent,
    DepartmentTeamComponent,
    DialogAddDepartmentComponent,
    DialogAddUserComponent,
    UnallocatedEmployeesPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  entryComponents: [
    DialogAddDepartmentComponent,
    DialogAddUserComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
