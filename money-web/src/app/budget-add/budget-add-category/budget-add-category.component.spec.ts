import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAddCategoryComponent } from './budget-add-category.component';

describe('BudgetAddCategoryComponent', () => {
  let component: BudgetAddCategoryComponent;
  let fixture: ComponentFixture<BudgetAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
