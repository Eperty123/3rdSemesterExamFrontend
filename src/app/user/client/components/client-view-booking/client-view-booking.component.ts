import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingDetailsDto } from 'src/app/dtos/booking-details-dto';
import { CoachDto } from 'src/app/dtos/coach-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-view-booking',
  templateUrl: './client-view-booking.component.html',
  styleUrls: ['./client-view-booking.component.css']
})
export class ClientViewBookingComponent implements OnInit {

  coaches? : CoachDto[] = [];
  bookings? : BookingDetailsDto[] = [];
  clientId? : number;
  errorMessage? : string = "Loading...";

  constructor(private _userService : UserService, private _bookingService : BookingService, private _datePipe: DatePipe) { }

  ngOnInit(): void {

    this.clientId = UserHelper.getUserId();

    this.loadCoaches();
  }

  loadCoaches() {
    this._userService.getAllCoaches().subscribe(
      {
        next: (coaches) => {
          for(let i = 0; i < coaches.length; i++) {
            let coach = coaches[i];
            this.coaches?.push(coach);
          }
        },
        complete: () => this.loadBookings(),
        error: (e) => this.errorMessage = e["error"],
      }
    );
  }

  loadBookings() {
    this._bookingService.getAllBookings().subscribe({
      next: (bookings) => {

        for(let i = 0; i < bookings.length; i++) {
          let booking = bookings[i];

          if(booking.clientId == this.clientId) {
            let dto : BookingDetailsDto = {
              id : booking.id,
              coachId : booking.coachId,
              clientId : this.clientId,
              username : this.getCoach(booking.coachId)?.username as string,
              date : booking.date,
            }
            this.bookings?.push(dto);
          }
        }
      },
      complete: () => {      
        if(this.bookings?.length == 0) this.errorMessage = "No bookings found.";
      },
      error: (e) => this.errorMessage = e["error"],
    })
  }

  formatDateAsReadable(date : Date) : string {
    return this._datePipe.transform(date, "dd/MM/YYYY HH:mm:ss")?.toString() as string;
  }

  getCoach(coachId : number) : CoachDto | undefined {
    return this.coaches?.find(x=>x.id == coachId);
  }
}
