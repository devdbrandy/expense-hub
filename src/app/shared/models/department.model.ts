import { Manager, Employee } from './employee.model';

export const departments: Department[] = [];

export class Department {

  constructor(
    public name: string,
    public manager: Manager
  ) { }

  addMember(member: Employee) {
    this.manager.team.push(member);
  }

}
