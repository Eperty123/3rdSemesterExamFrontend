import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-delete-booking',
  templateUrl: './delete-booking.component.html',
  styleUrls: ['./delete-booking.component.css']
})
export class DeleteBookingComponent implements OnInit {

  selectedId? : Number;
  errorMessage? : string = "Loading...";
  hasError?: boolean = false;

  constructor(private _bookingService : BookingService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));

    this._bookingService.deleteBooking(this.selectedId as number).subscribe({
      complete: () => {
        this.errorMessage = "Booking canceled.";
        
        setTimeout(() => {
          this._router.navigateByUrl("client/bookings");
        }, 1350);  //5s
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = e["error"];

        setTimeout(() => {
          this._router.navigateByUrl("client/bookings");
        }, 1350);  //5s
      }
    })
  }

  getCorrectAlertType() {
    return this.hasError ? "alert-danger" : "alert-success";
  }

}
