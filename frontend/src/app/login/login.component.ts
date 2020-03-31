import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/users.service';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  formEmail = new FormControl("", { validators: [Validators.email, Validators.required]});
  formPassword = new FormControl("", { validators: Validators.required});
  hide = true;

  constructor(private _service: UserService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: this.formEmail,
      password: this.formPassword,
    });
  }

  encryptData(text) {
    let shift = 2;
    var result = "";
    for (var i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        result += String.fromCharCode(c + shift);         
    }
    return result;
}

  onSubmit() {
    if(this.loginForm.status === "VALID") {
      console.log("user details", this.loginForm);
      let temp = {...this.loginForm.value};
      temp.password = this.encryptData(temp.password);
      this._service.loginUser(temp).subscribe(
        data => {
          var userdetails = data;
          //var uservalue = userdetails['user'];
          var token = userdetails['token'];
          localStorage.setItem("token", token)
          //console.log('Success ', userdetails['user'], token)
          this.router.navigate(["/places"]);
        },
        err =>{
          alert(err['error']['message'])
        }
      )
    }
  }
}
