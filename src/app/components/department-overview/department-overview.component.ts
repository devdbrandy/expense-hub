import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Department } from '../../shared/models';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit, OnChanges {
  @Input() selectedDept: string;
  department: Department;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.departmentService.getDepartmentByName(this.selectedDept).subscribe(department => {
      this.department = department;
    });
  }

}
