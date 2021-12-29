import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDaterangeComponent } from './input-daterange.component';

describe('InputDaterangeComponent', () => {
  let component: InputDaterangeComponent;
  let fixture: ComponentFixture<InputDaterangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDaterangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDaterangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
