import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAddDateComponent } from './budget-add-date.component';

describe('BudgetAddDateComponent', () => {
  let component: BudgetAddDateComponent;
  let fixture: ComponentFixture<BudgetAddDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAddDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAddDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
