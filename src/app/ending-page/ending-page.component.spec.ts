import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndingPageComponent } from './ending-page.component';

describe('EndingPageComponent', () => {
  let component: EndingPageComponent;
  let fixture: ComponentFixture<EndingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
