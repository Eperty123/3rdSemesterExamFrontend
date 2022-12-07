import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UpdateUserDto } from 'src/app/dtos/update-user-dto';
import { UserDto } from 'src/app/dtos/user-dto';
import { UserHelper } from 'src/app/helpers/user-helper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  user?: UserDto;
  errorMessage? : string = "Loading...";


  updateForm = new FormGroup({
    oldPassword: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  constructor(private _userService : UserService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this._userService.getUser(UserHelper.getUserId()).subscribe({
      next: (user) => {
        this.user = user;

        this.updateFormValues();
      },
      error: (e) => {
        this.errorMessage = "Failed to load user details :(";
      }
    });
  }

  updateFormValues() {
    this.updateForm.patchValue({
     description: this.user?.description,
    });
  }

  update() {
    let dto = this.updateForm.value as UpdateUserDto;
    dto.id = UserHelper.getUserId();
    this._userService.updateUser(dto).subscribe({
      complete: () => {
        alert("Profile updated successfully!");
      },
      error: (e) => {
        alert(e["error"]);
      }
    });
  }
}
