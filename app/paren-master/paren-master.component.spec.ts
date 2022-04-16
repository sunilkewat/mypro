import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenMasterComponent } from './paren-master.component';

describe('ParenMasterComponent', () => {
  let component: ParenMasterComponent;
  let fixture: ComponentFixture<ParenMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
