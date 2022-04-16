import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionMasterComponent } from './election-master.component';

describe('ElectionMasterComponent', () => {
  let component: ElectionMasterComponent;
  let fixture: ComponentFixture<ElectionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
