import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionAddCategoryComponent } from './transaction-add-category.component';

describe('TransactionAddCategoryComponent', () => {
  let component: TransactionAddCategoryComponent;
  let fixture: ComponentFixture<TransactionAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
