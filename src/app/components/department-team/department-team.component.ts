import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { employees, Developer, QATester, Manager } from '../../shared/models/employee.model';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Department } from '../../shared/models/department.model';
import { Employee } from '../../shared/models/employee.model';
import { DialogAddUserComponent } from '../../components/dialog-add-user/dialog-add-user.component';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-team',
  templateUrl: './department-team.component.html',
  styleUrls: ['./department-team.component.scss'],
})
export class DepartmentTeamComponent implements OnInit, OnChanges {
  @ViewChild('userSelect', { static: false }) userSelect;
  @Input() selectedDept = '';
  department: Department;
  team: Employee[] = [];
  faTimes = faTimes;
  faUserPlus = faUserPlus;
  departmentTeam = new FormControl();
  employees: Employee[] = employees;
  selectedMembers: Employee[];

  constructor(
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.departmentService.getDepartmentByName(this.selectedDept).subscribe(data => {
      if (data) {
        this.department = data;
        this.team = this.department.manager.team;
      }
    });
  }

  openDialog() {
    this.userSelect.close(); // close select dropdown
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '580px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createAddUser(result);
      }
    });
  }

  createAddUser({ name, role }: IEmployee) {
    let employee: Employee;

    switch (role) {
      case 'developer':
        employee = new Developer(name);
        break;
      case 'qa-tester':
        employee = new QATester(name);
        break;
      default:
        employee = new Manager(name);
        break;
    }

    // add to dept manager team
    if (this.department) {
      this.department.addMember(employee);
    }
  }

  toggleSelection() {
    if (this.department) {
      const member = this.selectedMembers[this.selectedMembers.length - 1];
      this.department.addMember(member);
    }
  }

  onClickDelete(member: Employee) {
    this.department.removeMember(member);
  }

}

export interface IEmployee {
  name: string;
  role: string;
}
