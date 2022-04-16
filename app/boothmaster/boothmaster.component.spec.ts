import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothmasterComponent } from './boothmaster.component';

describe('BoothmasterComponent', () => {
  let component: BoothmasterComponent;
  let fixture: ComponentFixture<BoothmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
