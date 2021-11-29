import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarCategoryComponent } from './topbar-category.component';

describe('TopbarCategoryComponent', () => {
  let component: TopbarCategoryComponent;
  let fixture: ComponentFixture<TopbarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
