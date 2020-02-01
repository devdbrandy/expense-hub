import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Department } from '../../shared/models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit, OnChanges {
  @Input() selectedDept: string;
  departments: Department[];
  department: Department;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  ngOnChanges() {
    this.departmentService.getDepartmentByName(this.selectedDept).subscribe(data => {
      this.department = data;
    });
  }

}
