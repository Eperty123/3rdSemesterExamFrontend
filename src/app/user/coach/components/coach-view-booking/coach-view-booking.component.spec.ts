import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachViewBookingComponent } from './coach-view-booking.component';

describe('CoachViewBookingComponent', () => {
  let component: CoachViewBookingComponent;
  let fixture: ComponentFixture<CoachViewBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachViewBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachViewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
