/* eslint-disable */

class Employee {
  constructor(name) {
    this.name = name;
    this.allocation = null;
  }

  reportsTo(manager) {
    this._reportsTo = manager.name;
  }

  get isReportsTo() {
    return !!this._reportsTo;
  }

  get manager() {
    return this._reportsTo;
  }
}

class Manager extends Employee {
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

class Developer extends Employee {
  constructor(name) {
    super(name);
    this.role = 'developer';
    this.allocation = 1000;
  }
}

class QATester extends Employee {
  constructor(name) {
    super(name);
    this.role = 'qa-tester';
    this.allocation = 5000;
  }
}

const employees = [];

const m1 = new Manager('Philip Who');
const m2 = new Manager('Mary Mong');
const m3 = new Manager('King Smith');

const qaEmployee2 = new QATester('Adorable Olamide');

employees.push(...[m1, m2, m3]);

const depts = [
  {
    name: 'Operations',
    manager: m1,
  },
  {
    name: 'QA Testers',
    manager: m2,
  },
  {
    name: 'Developers',
    manager: m3,
  },
];

// QA Testers
const deptIndex = 1;
const qaEmployee = new QATester('White Snow');
qaEmployee.reportsTo(m2);
depts[deptIndex].manager.team.push(qaEmployee);

const d1 = new Developer('John Doe');
d1.reportsTo(m2);
depts[deptIndex].manager.team.push(d1);

// Developers
const d2 = new Developer('Harry Dbrandy');
const d3 = new Developer('Sage Pain');
const devDeptIndex = 2;
d2.reportsTo(m3);
d3.reportsTo(m3);
depts[devDeptIndex].manager.team.push(...[d2, d3]);

// // Operations Manager
const opsIndex = 0;
depts[opsIndex].manager.team.push(m2);

console.log(JSON.stringify(depts));
console.log('Ops Manager Allocation', m1.totalAllocation);
console.log('QA Manager Allocation', m2.totalAllocation);
console.log('Dev Manager Allocation', m3.totalAllocation);
