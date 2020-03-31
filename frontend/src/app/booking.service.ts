import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBusToFrom() {
    return this.http.get('https://www.tripvista.club/api/bus/list');
  }

  searchBus(val1,val2,val3) {
    return this.http.post('https://www.tripvista.club/api/bus/search',{to: val1, from: val2, seats: val3});
  }

  payment(busId,price,cardNumber,seats){
    let token=localStorage.getItem("token")
    console.log(token)
   return this.http.post('https://www.tripvista.club/api/booking/book',{busId:busId,price:price,cardNumber:cardNumber,seats:seats},{headers: new HttpHeaders().set('authorization', 'Bearer '+token)});
  }

  bookingHistory(){
    let token=localStorage.getItem("token")
    console.log(token)
   return this.http.get('https://www.tripvista.club/api/booking/history',{headers: new HttpHeaders().set('authorization', 'Bearer '+token)});
  }

}
