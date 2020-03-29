import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/users.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    formEmail = new FormControl("", { validators: [Validators.email, Validators.required] });
    formPassword = new FormControl("", { validators: Validators.required });
    formUsername = new FormControl("", { validators: Validators.required });
    hide = true;
    step1 = true;
    token: String = "";
    uniqueId = "";

    constructor(private _service: UserService, private router: Router, fb: FormBuilder) {
        this.registerForm = fb.group({
            username: this.formUsername,
            email: this.formEmail,
            password: this.formPassword,
        });
    }

    onSubmit() {
        console.log(this.formEmail);
        this._service.sendMail(this.registerForm.value).subscribe(
            data => {
                console.log('response ', data);
                this.uniqueId = data.id;
                this.step1 = !this.step1;
            }
        )
    }

    verify_token() {
        let data = { id: this.uniqueId, code:  +this.token}
        console.log("insider verify token function", data);
        this._service.verifyUser(data).subscribe(
            data => {
                console.log('response in verify', data);
                localStorage.setItem("token", this.uniqueId)
                this.router.navigate(["/"]);
            },
            error => console.log('ERROR', error)
        )

    }
}
