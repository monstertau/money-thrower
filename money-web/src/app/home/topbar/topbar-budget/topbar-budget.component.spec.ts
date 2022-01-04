import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarBudgetComponent } from './topbar-budget.component';

describe('TopbarBudgetComponent', () => {
  let component: TopbarBudgetComponent;
  let fixture: ComponentFixture<TopbarBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
