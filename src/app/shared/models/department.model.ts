import { Manager, Employee } from './employee.model';

export const departments: Department[] = [];

export class Department {

  constructor(
    public name: string,
    public manager: Manager
  ) {
    manager.toggleHeadOfDept(); // activate head of department attr
  }

  addMember(member: Employee) {
    member.setManager(this.manager);
    this.manager.team.push(member);
  }

  removeMember(member: Employee) {
    member.removeManager();
    const index = this.manager.team.indexOf(member);
    this.manager.team.splice(index, 1);
  }

}
