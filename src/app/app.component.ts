import { Component } from '@angular/core';

import { departments } from './shared/data';
import { Department } from './shared/models/department.model';

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

  setSelectedDepartment(department) {
    this.selectedDepartment = department;
  }
}
