import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: [],
})
export class EmpDetailDialogComponent {
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  async saveEmployee(): Promise<void> {
    if (this.employeeForm.valid) {
      const employeeData = {
        name: this.employeeForm.value.name,
        email: this.employeeForm.value.email,
      };

      const emailExists = await this.employeeService.checkEmailExists(
        employeeData.email
      );
      if (emailExists) {
        this.employeeForm.controls['email'].setErrors({
          emailAlreadyExist: 'Email Already Exist',
        });
      } else {
        this.employeeForm.controls['email'].setErrors(null);
        this.dialogRef.close(employeeData);
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
