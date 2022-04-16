import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpositionPartyLeaderComponent } from './oposition-party-leader.component';

describe('OpositionPartyLeaderComponent', () => {
  let component: OpositionPartyLeaderComponent;
  let fixture: ComponentFixture<OpositionPartyLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpositionPartyLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpositionPartyLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
