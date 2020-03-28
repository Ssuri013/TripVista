import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBusToFrom() {
    return this.http.get('http://localhost:3000/api/bus');
  }

  searchBus(val1,val2) {
    return this.http.get('http://localhost:3000/api/searchbus',{params: {to: val1, from: val2}});
  }

  payment(userId,busId,bookingDate,price,cardNumber){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  '*',

      })
    };
    let param= {userId:"90",busId:busId,bookingDate:bookingDate,price:price,cardNumber:cardNumber};
    return this.http.post('http://localhost:3000/api/booking/book',{userId:userId,busId:busId,bookingDate:bookingDate,price:price,cardNumber:cardNumber});
  }
}
