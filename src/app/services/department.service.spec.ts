import { DepartmentService } from './department.service';
import { Manager, Developer, Department } from '../shared/models';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(() => {
    service = new DepartmentService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all departments', () => {
    service.getDepartments().subscribe(value => {
      expect(value).toEqual([]);
    });
  });

  it('should get department by name', () => {
    const manager = new Manager('Clark Kent');
    const departmentData = { name: 'TDD', manager };
    service.departments.push(departmentData);

    service.getDepartmentByName(departmentData.name).subscribe(value => {
      expect(value.name).toEqual(departmentData.name);
    });
  });

  it('should create new department', () => {
    const manager = new Manager('Martin Luton');
    const data = { name: 'Operations', manager };
    service.addDepartment(data).subscribe(value => {
      expect(value.name).toEqual('Operations');
      expect(value.manager.name).toEqual('Martin Luton');
      expect(value.manager.role).toEqual('manager');
      expect(value.manager.allocation).toEqual(30000);
    });
  });

  it('should add member to existing department', () => {
    const developer = new Developer('Harry Pots');
    const manager = new Manager('Clark Kent');
    const department = new Department('Developers', manager);

    service.departments.push(department);
    service.addMemberToDepartment(developer, department).subscribe(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should remove member from existing department', () => {
    const developer = new Developer('Harry Pots');
    const manager = new Manager('Clark Kent');
    const department = new Department('Developers', manager);

    service.departments.push(department);

    service.removeMemberFromDepartment(developer, department).subscribe(value => {
      expect(value).toBeTruthy();

      const departmentIndex = service.departments.indexOf(department);
      expect(service.departments[departmentIndex].manager.team.indexOf(developer))
        .toEqual(-1);
    });
  });
});
