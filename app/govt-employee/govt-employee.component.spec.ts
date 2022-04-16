import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtEmployeeComponent } from './govt-employee.component';

describe('GovtEmployeeComponent', () => {
  let component: GovtEmployeeComponent;
  let fixture: ComponentFixture<GovtEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
