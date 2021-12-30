import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDaterangeComponent } from './custom-daterange.component';

describe('CustomDaterangeComponent', () => {
  let component: CustomDaterangeComponent;
  let fixture: ComponentFixture<CustomDaterangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDaterangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
