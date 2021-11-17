import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAddWalletComponent } from './transaction-add-wallet.component';

describe('TransactionAddWalletComponent', () => {
  let component: TransactionAddWalletComponent;
  let fixture: ComponentFixture<TransactionAddWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAddWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAddWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
