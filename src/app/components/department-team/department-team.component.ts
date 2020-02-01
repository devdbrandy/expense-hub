import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Department, Employee } from '../../shared/models';
import { DialogAddUserComponent } from '../../components/dialog-add-user/dialog-add-user.component';
import { DepartmentService, EmployeeService } from '../../services';

@Component({
  selector: 'app-department-team',
  templateUrl: './department-team.component.html',
  styleUrls: ['./department-team.component.scss'],
})
export class DepartmentTeamComponent implements OnInit, OnChanges {

  @ViewChild('employeeSelect', { static: false }) employeeSelect;
  @Input() selectedDept = '';
  department: Department;

  employees: Employee[] = [];
  selectedEmployees: Employee[];

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
    this.employeeSelect.close(); // close select dropdown
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '580px',
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.createAddUser(data);
      }
    });
  }

  createAddUser({ name, role }: IEmployee) {
    this.employeeService.createEmployee(name, role).subscribe(employee => {
      this.employees.push(employee);

      if (this.selectedDept && this.department) {
        this.employeeService.setManager(employee, this.department.manager)
          .subscribe((updatedEmployee) => {
            this.updateEmployeeData(updatedEmployee);

            // add to dept manager team
            this.departmentService.addMemberToDepartment(employee, this.department)
              .subscribe();
          });
      }
    });
  }

  toggleMemberSelection() {
    if (this.department && this.selectedEmployees.length) {
      const member = this.selectedEmployees[this.selectedEmployees.length - 1];

      this.employeeService.setManager(member, this.department.manager)
        .subscribe((updatedMember) => {
          this.updateEmployeeData(updatedMember);

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

  updateEmployeeData(employee: Employee) {
    const index = this.employees.indexOf(employee);
    this.employees[index] = employee;
  }

  removeMemberFromSelection(member: Employee) {
    const memberIndex = this.employeeSelect.value.indexOf(member);
    this.employeeSelect.value.splice(memberIndex, 1);
  }

}

export interface IEmployee {
  name: string;
  role: string;
}
