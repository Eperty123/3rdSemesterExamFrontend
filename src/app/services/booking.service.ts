import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AvailableTimesDto} from "../dtos/available-times-dto";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: HttpClient) { }

  updateAvailableTimes(input : AvailableTimesDto) : Observable<AvailableTimesDto> {
    return this._http.put<AvailableTimesDto>(environment.getApiAddress() + 'booking', input);
  }

  getAvailableTimes(coachId : number) : Observable<AvailableTimesDto> {
    return this._http.get<AvailableTimesDto>(environment.getApiAddress() + 'booking/' + coachId);
  }
}
