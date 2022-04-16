import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationentryComponent } from './populationentry.component';

describe('PopulationentryComponent', () => {
  let component: PopulationentryComponent;
  let fixture: ComponentFixture<PopulationentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
