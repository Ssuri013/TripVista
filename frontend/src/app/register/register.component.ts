import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/users.service';
import { MailerService } from '../service/mailer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModel: any = {};
  email: string= "";

  constructor(private _service: UserService, private router: Router,private _mailService : MailerService) { }

  ngOnInit() {
  }

  onSubmit(){
    
    this._mailService.sendMail(this.userModel).subscribe(
      data=>{
        console.log('response ', data);
        this.email = data.email;
        
      } 
    )
    this.router.navigate(["/verify/"+this.email]);
  }
 
  doRegister(){
    console.log("register component",this.userModel);
    this._service.createUser(this.userModel).subscribe(
      data=> {
        console.log('response ', data);
        var userdetails = data;
        var uservalue = userdetails['user'];
        var token = uservalue['token'];
        localStorage.setItem("token",token)
        console.log('Success ', userdetails['user'], token)
        
      },
      error=> console.log('ERROR' , error)
    )
    this.router.navigate(["/places"]);
  }

}
