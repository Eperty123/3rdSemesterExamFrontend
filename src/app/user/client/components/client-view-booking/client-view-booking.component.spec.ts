import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewBookingComponent } from './client-view-booking.component';

describe('ClientViewBookingComponent', () => {
  let component: ClientViewBookingComponent;
  let fixture: ComponentFixture<ClientViewBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientViewBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
