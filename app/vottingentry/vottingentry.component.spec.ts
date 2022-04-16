import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VottingentryComponent } from './vottingentry.component';

describe('VottingentryComponent', () => {
  let component: VottingentryComponent;
  let fixture: ComponentFixture<VottingentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VottingentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VottingentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
