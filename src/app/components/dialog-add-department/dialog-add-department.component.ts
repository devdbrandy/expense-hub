import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Department } from '../../shared/models/department.model';
import { NgForm } from '@angular/forms';
import { Manager } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-dialog-add-department',
  templateUrl: './dialog-add-department.component.html',
  styleUrls: ['./dialog-add-department.component.scss']
})
export class DialogAddDepartmentComponent implements OnInit {
  model = { departmentName: '', managerName: '' };

  constructor(
    public dialogRef: MatDialogRef<DialogAddDepartmentComponent>,
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    this.dialogRef.close(form.value);
    // form.reset();
  }

}
