import { Manager } from './employee.model';

export const departments: Department[] = [];

export class Department {

  constructor(
    public name: string,
    public manager: Manager
  ) { }

}
