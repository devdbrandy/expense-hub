import { Manager } from './employee.model';

export class Department {

  constructor(
    public name: string,
    public manager: Manager
  ) {
    manager.toggleHeadOfDept(); // activate head of department attr
  }

}
