import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryPopupComponent } from './transaction-history-popup.component';

describe('TransactionHistoryPopupComponent', () => {
  let component: TransactionHistoryPopupComponent;
  let fixture: ComponentFixture<TransactionHistoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
