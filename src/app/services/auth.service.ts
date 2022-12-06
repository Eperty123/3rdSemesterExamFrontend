import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserDto } from '../dtos/login-user-dto';
import { TokenDto } from '../dtos/token-dto';
import { UserHelper } from '../helpers/user-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new BehaviorSubject<string | null>(this.getToken());

  constructor(private _http: HttpClient) {
  }

  login(loginDto: LoginUserDto): Observable<TokenDto> {
    return this._http
      .post<TokenDto>(environment.getApiAddress() + "auth", loginDto)
      .pipe(
        tap(token => {
          if (token && token.token) {
            UserHelper.setUserToken(token.token);
            UserHelper.setUserId(token.userId);
            UserHelper.setUserType(token.userType);
            this.isLoggedIn$.next(token.token);
          } else this.logOut();
        })
      )
  }

  logOut() {
    this.isLoggedIn$.next(null);
    UserHelper.setUserToken(null);
    UserHelper.setUserId(null);
    UserHelper.setUserType(null);
  }

  getToken() : string | null {
    return UserHelper.getUserToken();
  }

  isLoggedIn() {
    return this.getToken();
  }
}
