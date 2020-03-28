import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  token: String = '';
  private sub: any;
  id: String ="";
  private data: any;

  constructor(private _service: UserService,private router: ActivatedRoute, private route:Router ) { }

  ngOnInit() {
    
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id']; 
      console.log("emails ",params)
  
    });

    
  }

  verify_token(){

    this.data = {email: this.id,token:this.token}
    console.log("insider verify token function",this.data);
    this._service.verifyUser(this.data).subscribe(
      data=> {
       
        console.log('response in verify', data);
        var userdetails = data;
        var uservalue = userdetails['user'];
        var token = uservalue['token'];
        localStorage.setItem("token",token)
        console.log('Success ', userdetails['user'], token)
        
      },
      error=> console.log('ERROR' , error)
    )
    //this.route.navigate(["/places"]);
    //console.log("user verified");
  }

}
