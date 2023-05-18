import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDetailDialogComponent } from './emp-detail-dialog.component';

describe('EmpDetailDialogComponent', () => {
  let component: EmpDetailDialogComponent;
  let fixture: ComponentFixture<EmpDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpDetailDialogComponent]
    });
    fixture = TestBed.createComponent(EmpDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
