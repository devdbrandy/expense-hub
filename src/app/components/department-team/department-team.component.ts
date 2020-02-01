import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Department } from '../../shared/models/department.model';
import { Employee } from '../../shared/models/employee.model';
import { DialogAddUserComponent } from '../../components/dialog-add-user/dialog-add-user.component';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-department-team',
  templateUrl: './department-team.component.html',
  styleUrls: ['./department-team.component.scss'],
})
export class DepartmentTeamComponent implements OnInit, OnChanges {

  @ViewChild('userSelect', { static: false }) userSelect;
  @Input() selectedDept = '';
  department: Department;

  employees: Employee[] = [];
  selectedMembers: Employee[];

  faTimes = faTimes;
  faUserPlus = faUserPlus;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  ngOnChanges() {
    this.fetchDepartment();
  }

  fetchDepartment(): void {
    this.departmentService.getDepartmentByName(this.selectedDept).subscribe(department => {
      this.department = department;
    });
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
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
    this.employeeService.createEmployee(name, role).subscribe(employee => {
      this.employees.push(employee);

      if (this.selectedDept && this.department) {
        this.employeeService.setManager(employee, this.department.manager)
          .subscribe((updatedEmployee) => {
            const index = this.employees.indexOf(updatedEmployee);
            this.employees[index] = updatedEmployee;

            // add to dept manager team
            this.departmentService.addMemberToDepartment(employee, this.department)
              .subscribe();
          });
      }
    });
  }

  toggleMemberSelection() {
    if (this.department && this.selectedMembers.length) {
      const member = this.selectedMembers[this.selectedMembers.length - 1];

      this.employeeService.setManager(member, this.department.manager)
        .subscribe((updatedMember) => {
          const index = this.employees.indexOf(updatedMember);
          this.employees[index] = updatedMember;

          this.departmentService.addMemberToDepartment(updatedMember, this.department)
            .subscribe(() => this.removeMemberFromSelection(member));
        });
    }
  }

  onDeleteClick(member: Employee) {
    this.employeeService.removeManager(member).subscribe(() => {
      this.departmentService.removeMemberFromDepartment(member, this.department)
        .subscribe();
    });
  }

  removeMemberFromSelection(member: Employee) {
    const memberIndex = this.userSelect.value.indexOf(member);
    this.userSelect.value.splice(memberIndex, 1);
  }

}

export interface IEmployee {
  name: string;
  role: string;
}
