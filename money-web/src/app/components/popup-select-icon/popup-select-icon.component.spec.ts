import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSelectIconComponent } from './popup-select-icon.component';

describe('PopupSelectIconComponent', () => {
  let component: PopupSelectIconComponent;
  let fixture: ComponentFixture<PopupSelectIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSelectIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSelectIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
