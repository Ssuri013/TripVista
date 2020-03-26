import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  to: Object;
  from: Object;
  minDate: Date;
  date: String;
  dataSource: Object;
  toBus: String;
  fromBus: String;
  busId: String;
  flag: boolean;
  bookPressed: boolean;
  cardNo: String;
  price: String;
  test: any;

  constructor(private bs: BookingService) {
    const currentDate = new Date();
    this.minDate=currentDate;
    this.bookPressed=false
   }

   displayedColumns = ['b_id', 'dep', 'arr', 'price', 'seats','booknow'];

   busSearch=new FormGroup({
    busTo: new FormControl('',Validators.required),//
    busFrom: new FormControl('',Validators.required),//Validators.required
    date: new FormControl('',Validators.required)
   })

   cardValidator: FormControl =  new FormControl('', [Validators.required]);



   addEvent(event: MatDatepickerInputEvent<Date>) {
     this.date=event.value.toLocaleDateString()
   // this.events.push(`${type}: ${event.value}`);
  }

  cValid(){
    if(this.cardNo=""){
      return false;
    }
    return true
  }

  ngOnInit() {
      this.bs.getBusToFrom().subscribe(data => {
      this.to = data[0]
      this.from = data[1]
      //console.log("ABCD")
      //console.log(this.buses);
    }
  );
  }

  toChangeHandler (event: any) {
    this.toBus = event.value;
  }

  fromChangeHandler (event: any) {
    this.fromBus = event.value;
  }
  


  bookTicket(bID,price){
    this.bookPressed=true;
    this.busId=bID;
    this.price=price;
  }

  pay()
  {
    this.bs.payment("1",this.busId,this.date,this.price,this.cardNo).subscribe(data => {
        this.test=data
    });
  }
  
  
  onSubmit() {
      
      this.bs.searchBus(this.toBus,this.fromBus).subscribe(data => {
      if(Array.isArray(data) && data.length){
        this.dataSource = data;
        this.flag = false;
        this.bookPressed=false;
      }
      else{
        this.flag=true;
      }
      //console.log("ABCD")
      //console.log(this.buses);
    }
  );
    this.bookPressed=false;
    console.log(this.busSearch.get('date'))
  }

}
