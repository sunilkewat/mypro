import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyLeaderComponent } from './party-leader.component';

describe('PartyLeaderComponent', () => {
  let component: PartyLeaderComponent;
  let fixture: ComponentFixture<PartyLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
