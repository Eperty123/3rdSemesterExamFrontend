import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailableTimesDto } from 'src/app/dtos/available-times-dto';
import { CoachDto } from 'src/app/dtos/coach-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coach-manage-timeslot',
  templateUrl: './coach-manage-timeslot.component.html',
  styleUrls: ['./coach-manage-timeslot.component.css']
})
export class CoachManageTimeslotComponent implements OnInit {

  @Input() user : CoachDto | undefined;
  errorMessage : string = "Loading...";

  timeSlotForm = new FormGroup({
    startTime: new FormControl("", [Validators.required]),
    endTime: new FormControl("", [Validators.required]),
  });

  constructor(private _bookingService : BookingService, private _userService : UserService) { }

  ngOnInit(): void {
    this._userService.getCoach(UserHelper.getUserId()).subscribe({
      next: (user) => {
        this.user = user;
        this.timeSlotForm.patchValue({
          startTime: user.startTime,
          endTime: user.endTime
        });
      },
      error: (e) => {
        this.errorMessage = "Error :(";
      }
    });
  }

  update() {
    let dto = this.timeSlotForm.value as unknown as AvailableTimesDto;
    dto.coachId = UserHelper.getUserId();
    this._bookingService.updateAvailableTimes(dto).subscribe({
      error: (e) => alert(e["error"])
    });
  }

}
