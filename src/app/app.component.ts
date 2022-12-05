import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import {UserHelper } from './helpers/user-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AC Game Coaching';
  navbarCollapsed = true;

  constructor(private _authService: AuthService, private _userService : UserService, private _router: Router) { 
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  logOut() {
  this._authService.logOut();
  this._router.navigateByUrl("/login");
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  getUserType() : string {
    return UserHelper.getUserType() as string;
  }
}
