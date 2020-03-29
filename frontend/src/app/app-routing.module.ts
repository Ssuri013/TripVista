import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { RegisterComponent} from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ { path: '', component:  HomeComponent},
{ path: 'places', component: PlacesComponent },
{ path: 'bookings/:place', component: BookingComponent },
{ path: 'bookings', component: BookingComponent },
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  