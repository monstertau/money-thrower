import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNavigationComponent } from './input-navigation.component';

describe('InputNavigationComponent', () => {
  let component: InputNavigationComponent;
  let fixture: ComponentFixture<InputNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
