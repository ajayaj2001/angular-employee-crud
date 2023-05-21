import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee/employee.service';
import { EmpDetailDialogComponent } from '../emp-detail-dialog/emp-detail-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      height: '320px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createEmployee(result);
      }
    });
  }

  editEmployee(employee: any): void {
    const dialogRef = this.dialog.open(EmpDetailDialogComponent, {
      width: '300px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId);
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: any) => {
      this.employees = employees;
    });
  }

  createEmployee(employee: any): void {
    this.employeeService.createEmployee(employee);
  }

  updateEmployee(employee: any): void {
    this.employeeService.updateEmployee(employee);
  }
}
