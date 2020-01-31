import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../shared/models/employee.model';

@Pipe({
  name: 'unallocatedEmployees',
  pure: false,
})
export class UnallocatedEmployeesPipe implements PipeTransform {

  transform(employees: Employee[]): any {
    // filter unallocated employee and manager
    const filter = employees.filter(employee => {
      return (!employee.hasManager && !employee.isHeadOfDept);
    });
    return filter;
  }

}
