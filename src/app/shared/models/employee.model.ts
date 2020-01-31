export const employees: Employee[] = [];

export class Employee {
  role: string;
  allocation = null;
  team?: Employee[];
  private headOfDept = false;
  private reportsTo: string;

  constructor(public name: string) {
    this.addNewEmployee();
  }

  get totalAllocation() {
    return this.allocation;
  }

  private addNewEmployee() {
    employees.push(this);
  }

  setManager(manager: Employee) {
    this.reportsTo = manager.name;
  }

  removeManager() {
    this.reportsTo = '';
  }

  get hasManager() {
    return !!(this.reportsTo);
  }

  get isHeadOfDept() {
    return this.headOfDept;
  }

  toggleHeadOfDept() {
    this.headOfDept = !this.headOfDept;
  }

}

export class Manager extends Employee {

  constructor(name) {
    super(name);
    this.role = 'manager';
    this.allocation = 30000;
    this.team = [];
  }

  get totalAllocation() {
    let total = this.allocation;

    this.team.forEach(member => {
      if (member.team && member.team.length) {
        total += member.totalAllocation;
      } else {
        total += member.allocation;
      }
    });

    return total;
  }

}

export class Developer extends Employee {

  constructor(name) {
    super(name);
    this.role = 'developer';
    this.allocation = 1000;
  }

}

export class QATester extends Employee {

  constructor(name) {
    super(name);
    this.role = 'qa-tester';
    this.allocation = 5000;
  }

}
