import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor(private http: HttpClient) { }

  sendMail(email){

    console.log(email);
    return this.http.post<any>("http://localhost:3000/api/user/register",email); 

  }
}
