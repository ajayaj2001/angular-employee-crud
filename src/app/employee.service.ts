import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeCollection: AngularFirestoreCollection<any>;
  employees: any;

  constructor(private firestore: AngularFirestore) {
    this.employeeCollection = this.firestore.collection<any>('employees');
    this.employees = this.employeeCollection.valueChanges();
  }

  getEmployees(): any {
    return this.employees;
  }

  createEmployee(employee: any): void {
    this.employeeCollection.add(employee);
  }

  updateEmployee(employee: any): void {
    const id = employee.id;
    delete employee.id; // Remove the ID field before updating
    this.employeeCollection.doc(id).update(employee);
  }

  deleteEmployee(employeeId: string): void {
    this.employeeCollection.doc(employeeId).delete();
  }
}
