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
