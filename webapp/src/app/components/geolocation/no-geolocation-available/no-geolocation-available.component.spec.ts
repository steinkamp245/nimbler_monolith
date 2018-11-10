import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoGeolocationAvailableComponent } from './no-geolocation-available.component';

describe('NoGeolocationAvailableComponent', () => {
  let component: NoGeolocationAvailableComponent;
  let fixture: ComponentFixture<NoGeolocationAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoGeolocationAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGeolocationAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
