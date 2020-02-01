import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  model = { name: '', role: '' };
  roles = [
    { title: 'manager', amount: 30000 },
    { title: 'developer', amount: 1000 },
    { title: 'qa-tester', amount: 5000 },
  ];

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    this.dialogRef.close(form.value);
    form.reset();
  }

}
