import { Injectable } from '@angular/core';
import { Department } from '../shared/models/department.model';
import { Manager, Employee } from '../shared/models/employee.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departments: Department[] = [];

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return of([...this.departments]);
  }

  getDepartmentByName(name: string) {
    const department = this.departments.find(dept => dept.name === name);
    return of(department);
  }

  addDepartment(departmentData: IDepartment): Observable<Department> {
    const { name, manager } = departmentData;
    const department = new Department(name, manager);
    this.departments.push(department);
    return of(department);
  }

  addMemberToDepartment(member: Employee, department: Department): Observable<boolean> {
    const deptIndex = this.departments.indexOf(department);

    this.departments[deptIndex].manager.team.push(member);
    return of(true);
  }

  removeMemberFromDepartment(member: Employee, department: Department): Observable<boolean> {
    const index = department.manager.team.indexOf(member);
    const deptIndex = this.departments.indexOf(department);

    this.departments[deptIndex].manager.team.splice(index, 1);
    return of(true);
  }

}

export interface IDepartment {
  name: string;
  manager: Manager;
}
