import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, map } from 'rxjs/operators';

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
    const id = this.firestore.createId();
    const employeeWithId = { ...employee, id };
    this.employeeCollection.doc(id).set(employeeWithId);
  }

  updateEmployee(employee: any): void {
    const id = employee.id;
    delete employee.id; // Remove the ID field before updating
    this.employeeCollection.doc(id).update(employee);
  }

  deleteEmployee(employeeId: string): void {
    this.employeeCollection.doc(employeeId).delete();
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const querySnapshot = await this.employeeCollection.ref
      .where('email', '==', email)
      .get();
    return !querySnapshot.empty;
  }
}
