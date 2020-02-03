import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Department } from '../../shared/models';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedDept: string;
  department: Department;
  departmentServiceSubs: Subscription;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.departmentServiceSubs = this.departmentService.getDepartmentByName(this.selectedDept).subscribe(department => {
      this.department = department;
    });
  }

  ngOnDestroy() {
    this.departmentServiceSubs.unsubscribe();
  }

}
