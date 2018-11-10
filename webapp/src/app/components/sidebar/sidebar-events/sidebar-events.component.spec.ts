import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEventsComponent } from './sidebar-events.component';

describe('SidebarEventsComponent', () => {
  let component: SidebarEventsComponent;
  let fixture: ComponentFixture<SidebarEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
