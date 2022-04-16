import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionformComponent } from './permissionform.component';

describe('PermissionformComponent', () => {
  let component: PermissionformComponent;
  let fixture: ComponentFixture<PermissionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
