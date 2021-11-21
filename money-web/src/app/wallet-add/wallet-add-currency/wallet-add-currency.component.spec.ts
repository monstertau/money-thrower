import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddCurrencyComponent } from './wallet-add-currency.component';

describe('WalletAddCurrencyComponent', () => {
  let component: WalletAddCurrencyComponent;
  let fixture: ComponentFixture<WalletAddCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAddCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAddCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
