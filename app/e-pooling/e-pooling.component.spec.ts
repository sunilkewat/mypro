import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EPoolingComponent } from './e-pooling.component';

describe('EPoolingComponent', () => {
  let component: EPoolingComponent;
  let fixture: ComponentFixture<EPoolingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPoolingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
