export class Employee {
  role: string;
  allocation = null;
  team?: Employee[];

  constructor(
    public name: string,
  ) { }

  get totalAllocation() {
    return this.allocation;
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
