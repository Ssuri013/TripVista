import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [ { path: '', component: LoginComponent },
{ path: 'places', component: PlacesComponent },
{ path: 'bookings', component: BookingComponent },
{ path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
