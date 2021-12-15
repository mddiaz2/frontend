import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteuserComponent } from './reporteuser.component';

describe('ReporteuserComponent', () => {
  let component: ReporteuserComponent;
  let fixture: ComponentFixture<ReporteuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
