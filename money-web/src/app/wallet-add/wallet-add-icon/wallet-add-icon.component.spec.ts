import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddIconComponent } from './wallet-add-icon.component';

describe('WalletAddIconComponent', () => {
  let component: WalletAddIconComponent;
  let fixture: ComponentFixture<WalletAddIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAddIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
