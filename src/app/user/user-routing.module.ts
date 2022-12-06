import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ClientViewBookingComponent } from './client/components/client-view-booking/client-view-booking.component';
import { ClientViewComponent } from './client/components/client-view/client-view.component';
import { CoachManageTimeslotComponent } from './coach/components/coach-manage-timeslot/coach-manage-timeslot.component';
import { CoachViewBookingComponent } from './coach/components/coach-view-booking/coach-view-booking.component';
import { CoachViewComponent } from './coach/components/coach-view/coach-view.component';
import { CoachesViewComponent } from './coach/components/coaches-view/coaches-view.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileEditComponent } from './components/user-profile-edit/user-profile-edit.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
  { path: "login", component: UserLoginComponent},
  { path: "profile/view", component: UserProfileViewComponent, canActivate: [AuthGuard]},
  { path: "profile/edit", component: UserProfileEditComponent, canActivate: [AuthGuard]},
  { path: "coaches", component: CoachesViewComponent },
  { path: "coach/view/:id", component: CoachViewComponent },
  { path: "client/view/:id", component: ClientViewComponent },
  { path: "coach/manage-workhours", component: CoachManageTimeslotComponent, canActivate: [AuthGuard] },
  { path: "client/bookings", component: ClientViewBookingComponent, canActivate: [AuthGuard] },
  { path: "coach/bookings", component: CoachViewBookingComponent, canActivate: [AuthGuard] },
  { path: "register", component: UserRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
  