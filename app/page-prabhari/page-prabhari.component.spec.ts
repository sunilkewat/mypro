import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrabhariComponent } from './page-prabhari.component';

describe('PagePrabhariComponent', () => {
  let component: PagePrabhariComponent;
  let fixture: ComponentFixture<PagePrabhariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePrabhariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrabhariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
