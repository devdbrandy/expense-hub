import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatSelectModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentOverviewComponent } from './components/department-overview/department-overview.component';
import { DepartmentTeamComponent } from './components/department-team/department-team.component';
import { DialogAddDepartmentComponent } from './components/dialog-add-department/dialog-add-department.component';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { UnallocatedEmployeesPipe } from './pipes/unallocated-employees.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentOverviewComponent,
    DepartmentTeamComponent,
    DialogAddDepartmentComponent,
    DialogAddUserComponent,
    UnallocatedEmployeesPipe
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
  ],
  entryComponents: [DialogAddDepartmentComponent, DialogAddUserComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
