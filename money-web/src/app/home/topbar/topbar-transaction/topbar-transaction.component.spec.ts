import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarTransactionComponent } from './topbar-transaction.component';

describe('TopbarTransactionComponent', () => {
  let component: TopbarTransactionComponent;
  let fixture: ComponentFixture<TopbarTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
