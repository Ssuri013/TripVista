import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  homeurl = false;
  constructor(private router: Router ) {
    router.events.subscribe((val: RouterEvent)=> {
      if(val.url)
        this.homeurl = val.url == "/";
    })
  }

}
