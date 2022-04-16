import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyResultMasterComponent } from './assembly-result-master.component';

describe('AssemblyResultMasterComponent', () => {
  let component: AssemblyResultMasterComponent;
  let fixture: ComponentFixture<AssemblyResultMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblyResultMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyResultMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
