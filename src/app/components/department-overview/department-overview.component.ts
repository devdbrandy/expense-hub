import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Department } from '../../shared/models/department.model';
import { departments } from '../../shared/models/department.model';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit, OnChanges {
  @Input() selectedDept: string;
  department: Department;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.department = departments.find(department => department.name === this.selectedDept);
  }

}
