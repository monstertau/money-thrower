import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarReportComponent } from './topbar-report.component';

describe('TopbarReportComponent', () => {
  let component: TopbarReportComponent;
  let fixture: ComponentFixture<TopbarReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
