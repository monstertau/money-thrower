import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectCategoryComponent } from './popup-select-category.component';

describe('PopupSelectCategoryComponent', () => {
  let component: PopupSelectCategoryComponent;
  let fixture: ComponentFixture<PopupSelectCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSelectCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
