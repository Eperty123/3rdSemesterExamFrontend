import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteBookingComponent } from './components/delete-booking/delete-booking.component';

const routes: Routes = [
  { path: "booking/delete/:id", component: DeleteBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
