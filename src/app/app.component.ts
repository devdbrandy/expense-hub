import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Department } from './shared/models';
import { DialogAddDepartmentComponent } from './components/dialog-add-department/dialog-add-department.component';
import { DepartmentService, EmployeeService } from './services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expense-hub';
  selectedDept: string;
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
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

  addDepartment(departmentData: IDepartmentData) {
    const { departmentName: name, managerName } = departmentData;

    this.employeeService.createEmployee(managerName, 'manager').subscribe(manager => {
      this.departmentService.addDepartment({ name, manager }).subscribe(department => {
        this.departments.push(department);
        this.selectedDept = department.name;
      });
    });
  }

}

export interface IDepartmentData {
  departmentName: string;
  managerName: string;
}
