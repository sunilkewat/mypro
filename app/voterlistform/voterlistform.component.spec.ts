import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterlistformComponent } from './voterlistform.component';

describe('VoterlistformComponent', () => {
  let component: VoterlistformComponent;
  let fixture: ComponentFixture<VoterlistformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterlistformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterlistformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
