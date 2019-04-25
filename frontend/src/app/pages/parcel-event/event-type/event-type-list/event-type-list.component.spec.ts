import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeComponent } from './parcel-event-type.component';

describe('EventTypeListComponent', () => {
  let component: EventTypeComponent;
  let fixture: ComponentFixture<EventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});