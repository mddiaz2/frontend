import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginuComponent } from './loginu.component';

describe('LoginuComponent', () => {
  let component: LoginuComponent;
  let fixture: ComponentFixture<LoginuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
