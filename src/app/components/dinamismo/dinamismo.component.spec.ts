import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamismoComponent } from './dinamismo.component';

describe('DinamismoComponent', () => {
  let component: DinamismoComponent;
  let fixture: ComponentFixture<DinamismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamismoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
