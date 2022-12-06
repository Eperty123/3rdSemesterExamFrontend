import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientDto } from '../dtos/client-dto';
import { CoachDto } from '../dtos/coach-dto';
import { RegisterUserDto } from '../dtos/register-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { UserDto } from '../dtos/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
  }

  createUser(input : RegisterUserDto) : Observable<RegisterUserDto> {
    return this._http.post<RegisterUserDto>(environment.getApiAddress() + 'user', input);
  }

  updateUser(input : UpdateUserDto) : Observable<UpdateUserDto> {
    return this._http.put<UpdateUserDto>(environment.getApiAddress() + 'user', input);
  }

  getAllUsers() : Observable<UserDto[]> {
    return this._http.get<UserDto[]>(environment.getApiAddress() + 'user');
  }

  getAllClients() : Observable<ClientDto[]> {
    return this._http.get<ClientDto[]>(environment.getApiAddress() + 'user/clients');
  }

  getAllCoaches() : Observable<CoachDto[]> {
    return this._http.get<CoachDto[]>(environment.getApiAddress() + 'user/coaches');
  }

  getUser(id : number) : Observable<UserDto> {
    return this._http.get<UserDto>(environment.getApiAddress() + 'user/' + id);
  }

  getCoach(id : number) : Observable<CoachDto> {
    return this._http.get<CoachDto>(environment.getApiAddress() + 'user/coach/' + id);
  }
}
