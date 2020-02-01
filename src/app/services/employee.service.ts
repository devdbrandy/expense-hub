import { Injectable } from '@angular/core';
import { Employee, Developer, QATester, Manager } from '../shared/models/employee.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of([...this.employees]);
  }

  createEmployee(name, role): Observable<Employee> {
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

    this.employees.push(employee);
    return of(employee);
  }

  setManager(employee, manager): Observable<Employee> {
    const index = this.employees.indexOf(employee);
    this.employees[index].setManager(manager);

    return of(employee);
  }

  removeManager(employee): Observable<Employee> {
    const index = this.employees.indexOf(employee);
    this.employees[index].removeManager();

    return of(employee);
  }
}
