import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIconTextComponent } from './input-icon-text.component';

describe('InputIconTextComponent', () => {
  let component: InputIconTextComponent;
  let fixture: ComponentFixture<InputIconTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIconTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
