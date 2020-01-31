import { Department } from './models/department.model';
import { Employee, Manager, Developer } from './models/employee.model';

const manager1 = new Manager('Philip Stone');
const dev1 = new Developer('John Doe');

manager1.team.push(dev1);

export const departments: Department[] = [
  {
    name: 'Operations',
    manager: manager1,
  }
];

export const employees: Employee[] = [dev1];
