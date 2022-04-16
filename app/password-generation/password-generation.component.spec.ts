import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGenerationComponent } from './password-generation.component';

describe('PasswordGenerationComponent', () => {
  let component: PasswordGenerationComponent;
  let fixture: ComponentFixture<PasswordGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
