import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/dtos/user-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {

  user? : UserDto;
  constructor(private _userService : UserService) { }



  ngOnInit(): void {
    this._userService.getUser(UserHelper.getUserId()).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

}
