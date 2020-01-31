import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { departments } from '../../shared/data';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-department-team',
  templateUrl: './department-team.component.html',
  styleUrls: ['./department-team.component.scss']
})
export class DepartmentTeamComponent implements OnInit, OnChanges {
  @Input() selectedDept: string;
  team: Employee[];
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    const department = departments.find(dept => dept.name === this.selectedDept);
    this.team = department ? department.manager.team : [];
  }

}
