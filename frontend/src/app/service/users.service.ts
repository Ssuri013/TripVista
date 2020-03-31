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
    return this.http.post("http://localhost:3000/api/user/login",user); 
}

  createUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post("http://localhost:3000/api/users",users);
  
}
  verifyUser(token)
  {
    return this.http.post("http://localhost:3000/api/user/verify",token);
  }

  sendMail(email) {
    console.log(email);
    return this.http.post<any>("http://localhost:3000/api/user/register",email); 
  }

}
