import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarWalletComponent } from './topbar-wallet.component';

describe('TopbarWalletComponent', () => {
  let component: TopbarWalletComponent;
  let fixture: ComponentFixture<TopbarWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
