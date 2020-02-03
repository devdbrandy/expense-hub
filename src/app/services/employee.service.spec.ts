import { EmployeeService } from './employee.service';
import { Developer, Manager } from '../shared/models';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let developer = new Developer('Johnny Bravo');
  let manager = new Manager('King David');

  beforeEach(() => {
    developer = new Developer('Johnny Bravo');
    manager = new Manager('King David');

    service = new EmployeeService();
    service.employees.push(...[manager, developer]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all departments', () => {
    service.getEmployees().subscribe(value => {
      expect(value.length).toEqual(2);
    });
  });

  it('should create a new employee', () => {
    service.createEmployee('Mary Jane', 'manager').subscribe(value => {
      expect(value.name).toEqual('Mary Jane');
      expect(value.role).toEqual('manager');
      expect(value.allocation).toEqual(30000);
    });
  });

  it('should assign employee\'s manager', () => {
    service.setManager(developer, manager).subscribe(value => {
      expect(value.hasManager).toBeTruthy();
    });
  });

  it('should remove employee from manager teams', () => {
    service.removeManager(developer).subscribe(value => {
      expect(value.hasManager).toBeFalsy();
    });
  });
});
