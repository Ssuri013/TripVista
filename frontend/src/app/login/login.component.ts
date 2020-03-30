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

  onSubmit() {
    if(this.loginForm.status === "VALID") {
      console.log("user details", this.loginForm);
      this._service.loginUser(this.loginForm.value).subscribe(
        data => {
          var userdetails = data;
          //var uservalue = userdetails['user'];
          var token = userdetails['token'];
          localStorage.setItem("token", token)
          //console.log('Success ', userdetails['user'], token)
          this.router.navigate(["/places"]);
        },
        error => console.log('ERROR', error)
      )
    }
  }
}
