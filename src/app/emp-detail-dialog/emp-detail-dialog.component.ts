import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
})
export class EmpDetailDialogComponent {
  employee: any = {};

  constructor(
    public dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.employee = { ...data };
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
