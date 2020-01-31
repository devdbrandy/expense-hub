import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { departments } from './shared/models/department.model';
import { Department } from './shared/models/department.model';
import { DialogAddDepartmentComponent } from './components/dialog-add-department/dialog-add-department.component';
import { Manager } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-hub';
  selectedDept: string;
  departments = departments;
  selectedDepartment: Department;

  constructor(public dialog: MatDialog) { }

  setSelectedDepartment(department) {
    this.selectedDepartment = department;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddDepartmentComponent, {
      width: '580px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addDepartment(result);
      }
    });
  }

  addDepartment({ departmentName, managerName }: IDepartment) {
    const manager = new Manager(managerName);
    const newDepartment = new Department(departmentName, manager);
    this.departments.push(newDepartment);
  }
}

export interface IDepartment {
  departmentName: string;
  managerName: string;
}
