import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AvailableTimesDto} from "../dtos/available-times-dto";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { BookingDto } from '../dtos/booking-dto';
import { DeleteBookingComponent } from '../booking/components/delete-booking/delete-booking.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: HttpClient) { }

  updateAvailableTimes(input : AvailableTimesDto) : Observable<AvailableTimesDto> {
    return this._http.put<AvailableTimesDto>(environment.getApiAddress() + 'booking', input);
  }

  createBooking(booking : BookingDto) : Observable<BookingDto> {
    return this._http.post<BookingDto>(environment.getApiAddress() + 'booking', booking);
  }

  getBooking(id : number) : Observable<BookingDto> {
    return this._http.get<BookingDto>(environment.getApiAddress() + 'booking/' + id);
  }

  getAllBookings() : Observable<BookingDto[]> {
    return this._http.get<BookingDto[]>(environment.getApiAddress() + 'booking/');
  }

  deleteBooking(id : number) : Observable<BookingDto> {
    return this._http.delete<BookingDto>(environment.getApiAddress() + 'booking/' + id);
  }
}
