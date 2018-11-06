import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRedirectComponent } from './sign-in-redirect.component';

describe('SignInRedirectComponent', () => {
  let component: SignInRedirectComponent;
  let fixture: ComponentFixture<SignInRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
