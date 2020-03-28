import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { RegisterComponent} from './register/register.component';
import { VerifyUserComponent} from './verify-user/verify-user.component';

const routes: Routes = [ { path: '', component: LoginComponent },
{ path: 'places', component: PlacesComponent },
{ path: 'bookings', component: BookingComponent },
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'verify/:id', component: VerifyUserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  