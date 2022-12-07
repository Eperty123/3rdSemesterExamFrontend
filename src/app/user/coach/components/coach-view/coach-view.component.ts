import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, Time } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDto } from 'src/app/dtos/booking-dto';
import { CoachDto } from 'src/app/dtos/coach-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coach-view',
  templateUrl: './coach-view.component.html',
  styleUrls: ['./coach-view.component.css']
})
export class CoachViewComponent implements OnInit {

  @Input() user? : CoachDto;
  @Input() bookedDate? : Date;
  @Input() bookedTime? : string;
  errorMessage : string = "Loading...";
  private selectedId?: number;
  bookings : BookingDto[] = [];
  availableTimesOrig : string[] = [];
  availableTimes : string[] = [];
  selectedDate? : string;

  timeSlotForm = new FormGroup({
    date: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
  });

  constructor(private _bookingService : BookingService, private _userService : UserService, private _route: ActivatedRoute, private _router: Router, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));

    this._userService.getCoach(this.selectedId).subscribe({
      next: (user) => {
        this.user = user;
        this.timeSlotForm.patchValue({
          date: this.datePipe.transform(new Date(), "dd-MM-YYYY"),
        });

        this.getAvailableTimes(user);
      },
      error: (e) => {
        this.errorMessage = "Error fetching desired coach details :(";
      }
    });

    this._bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        for(let i = 0; i < bookings.length; i++) {
          let booking = bookings[i];

          // Found booking for the user and selected coach.
          if(booking.coachId == this.selectedId && booking.clientId == UserHelper.getUserId()) {
            this.bookings.push(booking);
          }
        }
      },
      error: (e) => {
        this.errorMessage = "Error fetching booking details of the desired coach :(";
      }
    });
  }

  getAvailableTimes(user : CoachDto) {
    let startTime = new Date();
    let startTimeSplit = user.startTime.split(':');
    startTime.setHours(Number.parseInt(startTimeSplit[0]),Number.parseInt(startTimeSplit[1]),Number.parseInt(startTimeSplit[2]));

    let endTime = new Date();
    let endTimeSplit = user.endTime.split(':');
    endTime.setHours(Number.parseInt(endTimeSplit[0]),Number.parseInt(endTimeSplit[1]),Number.parseInt(endTimeSplit[2]));
    let currentTime = startTime;
    let interval = 1; // 1 hour per coaching session. Hardcoded for now.

    // Add the available working hours to the list.
    let currHour = currentTime.getHours();
    for(let i = currentTime.getHours(); i < endTime.getHours(); i += interval) {
      this.availableTimesOrig.push(this.datePipe.transform(currentTime, "HH:mm:ss")?.toString() as string);
      currHour += interval;
      currentTime.setHours(currHour, currentTime.getMinutes(), 0);
    }

    //this.updateAvailableTimes();
  }

  updateAvailableTimes() {
    // Check the current selected date for any bookings.
    this.availableTimes = JSON.parse(JSON.stringify(this.availableTimesOrig));
    
    for(let i = 0; i < this.bookings.length; i++) {
      let booking = this.bookings[i];
      let bookingDate = new Date(booking.date);
      bookingDate.setHours(bookingDate.getHours(), 0, 0);
      let time = this.datePipe.transform(bookingDate, "HH:mm:ss")?.toString() as string;

      let selectedDate = new Date(this.selectedDate as string);
      let transformedSelectedDate = this.datePipe.transform(selectedDate, "dd-MM-YYYY");
      let transformedBookingDate = this.datePipe.transform(bookingDate, "dd-MM-YYYY");

      if(transformedSelectedDate?.match(transformedBookingDate as string)) {
        this.removeAvailableTime(time);
      }
    }
  }

  indexOfAvailableTime(time : string) {
    return this.availableTimes.indexOf(time);
  }

  removeAvailableTime(time : string) {
    this.availableTimes.splice(this.indexOfAvailableTime(time), 1);
  }

  book() {

    if(UserHelper.getUserToken() == null) {
      alert("You are not logged in. Please log in to schedule a booking.");
      return;
    }

    let bookedTimeSplit = (this.bookedTime as string).split(':');
    this.bookedDate = new Date(this.selectedDate as string);
    this.bookedDate.setHours(Number.parseInt(bookedTimeSplit[0]) + environment.timeZone,Number.parseInt(bookedTimeSplit[1]),Number.parseInt(bookedTimeSplit[2]));

    let dto : BookingDto = {
      id : 0,
      coachId : this.selectedId as number,
      clientId: UserHelper.getUserId(),
      date: this.bookedDate as Date,
      coach: undefined,
      client: undefined
    };

    this._bookingService.createBooking(dto).subscribe({
      complete: () => {
        alert("You have successfully booked a coaching session with: " + this.user?.username + ".");
        window.location.reload();
      },
      error: (e) => alert(e["error"])
    });
  }

  onTimeSelect(target :any) {
    let time = target.value;
    this.timeSlotForm.patchValue({
      time: time,
    });
    this.bookedTime = time;
  }

  onDateChange(date : any) {
    this.selectedDate = date.target.valueAsDate;
    this.updateAvailableTimes();
  }
}
