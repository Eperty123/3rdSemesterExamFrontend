import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingDetailsDto } from 'src/app/dtos/booking-details-dto';
import { ClientDto } from 'src/app/dtos/client-dto';
import { UserDto } from 'src/app/dtos/user-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coach-view-booking',
  templateUrl: './coach-view-booking.component.html',
  styleUrls: ['./coach-view-booking.component.css']
})
export class CoachViewBookingComponent implements OnInit {
  clients? : UserDto[] = [];
  bookings? : BookingDetailsDto[] = [];
  coachId? : number;
  errorMessage? : string = "Loading...";

  constructor(private _userService : UserService, private _bookingService : BookingService, private _datePipe: DatePipe) { }

  ngOnInit(): void {

    this.coachId = UserHelper.getUserId();

    this.loadCoaches();
  }

  loadCoaches() {
    this._userService.getAllClients().subscribe(
      {
        next: (clients) => {
          for(let i = 0; i < clients.length; i++) {
            let client = clients[i];
            this.clients?.push(client);
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

          if(booking.coachId == this.coachId) {
            let dto : BookingDetailsDto = {
              id : booking.id,
              coachId : booking.coachId,
              clientId : booking.clientId,
              username : this.getClient(booking.clientId)?.username as string,
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

  getClient(coachId : number) : ClientDto | undefined {
    return this.clients?.find(x=>x.id == coachId);
  }
}
