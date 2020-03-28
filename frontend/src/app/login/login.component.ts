import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel: any = {};

  constructor(private _service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){

    console.log("user details",this.userModel);

    this._service.loginUser(this.userModel).subscribe(
      data=> {
        var userdetails = data;
        var uservalue = userdetails['user'];
        var token = uservalue['token'];
        localStorage.setItem("token",token)
        console.log('Success ', userdetails['user'], token)
        this.router.navigate(["/places"]);
      },
      error=> console.log('ERROR' , error)

    )
   
  }

}
