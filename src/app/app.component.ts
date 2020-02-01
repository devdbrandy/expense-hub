import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { departments } from './shared/models/department.model';
import { Department } from './shared/models/department.model';
import { DialogAddDepartmentComponent } from './components/dialog-add-department/dialog-add-department.component';
import { Manager } from 'src/app/shared/models/employee.model';
import { DepartmentService } from './services/department.service';

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
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(data => {
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
    const manager = new Manager(managerName);

    this.departmentService.addDepartment({ name, manager }).subscribe(department => {
      this.departments.push(department);
      this.selectedDept = department.name;
    });
  }

}

export interface IDepartmentData {
  departmentName: string;
  managerName: string;
}
