import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterBoothAllotComponent } from './voter-booth-allot.component';

describe('VoterBoothAllotComponent', () => {
  let component: VoterBoothAllotComponent;
  let fixture: ComponentFixture<VoterBoothAllotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterBoothAllotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterBoothAllotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
