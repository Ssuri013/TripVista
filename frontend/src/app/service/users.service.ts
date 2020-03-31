import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post("https://www.tripvista.club/api/user/login",user); 
}

  createUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post("https://www.tripvista.club/api/users",users);
  
}
  verifyUser(token)
  {
    return this.http.post("https://www.tripvista.club/api/user/verify",token);
  }

  sendMail(email) {
    console.log(email);
    return this.http.post<any>("https://www.tripvista.club/api/user/register",email); 
  }

}
