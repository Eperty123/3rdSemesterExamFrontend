import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { DeleteBookingComponent } from './components/delete-booking/delete-booking.component';

@NgModule({
  declarations: [
    DeleteBookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
