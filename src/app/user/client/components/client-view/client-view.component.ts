import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/dtos/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  user? : UserDto;
  errorMessage : string = "Loading...";
  private selectedId?: number;

  constructor(private _userService : UserService, private _route: ActivatedRoute, private _router: Router, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.selectedId = Number(this._route.snapshot.paramMap.get('id'));

    this._userService.getUser(this.selectedId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (e) => {
        this.errorMessage = "Error fetching desired client details :(";
      }
    });
  }

}
