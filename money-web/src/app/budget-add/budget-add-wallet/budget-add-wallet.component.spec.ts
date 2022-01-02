import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAddWalletComponent } from './budget-add-wallet.component';

describe('BudgetAddWalletComponent', () => {
  let component: BudgetAddWalletComponent;
  let fixture: ComponentFixture<BudgetAddWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAddWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAddWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
