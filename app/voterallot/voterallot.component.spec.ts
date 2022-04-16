import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterallotComponent } from './voterallot.component';

describe('VoterallotComponent', () => {
  let component: VoterallotComponent;
  let fixture: ComponentFixture<VoterallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
