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
    return this.http.post("http://localhost:3000/api/users/login",users); 
}

  createUser(user){
    var users =  {user}
    console.log(users);
    return this.http.post("http://localhost:3000/api/users",users);
  
}
  verifyUser(token)
  {
    var tokens =  {token}
    console.log(tokens);
    return this.http.post("http://localhost:3000/api/users/verify",tokens);
  }
}
