import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= "https://www.tripvista.club";
  constructor(private http: HttpClient) { }

  loginUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post(this.url + "/api/user/login",user); 
}

  createUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post(this.url + "/api/users",users);
  
}
  verifyUser(token)
  {
    return this.http.post(this.url + "/api/user/verify",token);
  }

  sendMail(email) {
    console.log(email);
    return this.http.post<any>(this.url + "/api/user/register",email); 
  }
  
}
