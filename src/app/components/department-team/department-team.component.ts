import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { employees } from '../../shared/models/employee.model';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { departments } from '../../shared/models/department.model';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-department-team',
  templateUrl: './department-team.component.html',
  styleUrls: ['./department-team.component.scss'],
})
export class DepartmentTeamComponent implements OnInit, OnChanges {
  @Input() selectedDept: string;
  team: Employee[];
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  departmentTeam = new FormControl();
  employees: Employee[] = employees;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    const department = departments.find(dept => dept.name === this.selectedDept);
    this.team = department ? department.manager.team : [];
  }

}
