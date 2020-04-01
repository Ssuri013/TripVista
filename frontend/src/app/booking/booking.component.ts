import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';

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
  price: number;
  test: any;
  sucPay: boolean=false;
  bookingHist: Object;
  i: number = 0;
  btnText = "Booking History"



  displayedColumns = ['b_id', 'dep', 'arr', 'price', 'seats', 'booknow'];
  displayedHist = ['booking_id', 'booking_date', 'seats', 'price'];

  busSearch = new FormGroup({
    busTo: new FormControl('', Validators.required),
    busFrom: new FormControl('', Validators.required),

    selSeats: new FormControl('', [Validators.required, Validators.min(0), Validators.max(50)])
  })

  cardDetails: FormGroup;
  cardNumber = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]);
  cardDate = new FormControl('', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/([0-9]{2})')]); // pending
  cardCVV = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{3}$")]);
  

  
  constructor(private bs: BookingService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    const currentDate = new Date();
    this.minDate = currentDate;
    this.bookPressed = false;
    this.cardDetails = fb.group({
      cardNumber: this.cardNumber,
      cardDate: this.cardDate,
      cardCVV: this.cardCVV,
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.toLocaleDateString()
    // this.events.push(`${type}: ${event.value}`);
  }

  cValid() {
    if (this.cardNo && this.cardNo.length == 16) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    let token = localStorage.getItem("token")
    if (token == null || token == "") {
      this.router.navigate(["/login"])
    }
    this.bs.getBusToFrom().subscribe(data => {
      this.to = data['to']
      this.from = data['from']
    });
    this.route.params.subscribe(params => {
      this.toChangeHandler({ value: params['place'] })
    });

  }

  toChangeHandler(event: any) {
    this.toBus = event.value;
  }

  fromChangeHandler(event: any) {
    this.fromBus = event.value;
  }



  bookTicket(bID, price) {
    this.bookPressed = true;
    this.busId = bID;
    this.price = price;
  }

  pay() {
    if(this.cardDetails.value.cardNumber == "1".repeat(16)) {
      this.cardDetails.value.cardNumber = "1111-1111-1111-1111"
    }
    this.bs.payment(this.busId, this.price * this.busSearch.get("selSeats").value, this.cardDetails.value.cardNumber, this.busSearch.get("selSeats").value).subscribe(data => {
      this.test = data
      this.sucPay = true
      if (this.sucPay) {
        this.bs.bookingHistory().subscribe(data => {
          this.bookingHist = data

        })
      }
    },
    err=>{
      this.sucPay=false
      alert(err['error']['data']['error'])
      this.cardNo=""
    }
      );


  }
  
  bookHistory(){
    console.log('sssss')
    // if(!this.sucPay){
    //   this.sucPay=true
    // }
    // else{
    //   this.sucPay=false
    // }

    if(!this.sucPay){
      this.bs.bookingHistory().subscribe(data=>{
        this.bookingHist=data
        console.log(this.bookingHist)
        console.log("aaaaa")
        this.sucPay=true
        this.btnText="Back"
      })
    }
    else{
      this.sucPay=false
      this.bookPressed=false
      this.dataSource=null
      this.btnText="Booking History"
    }
  }
  
  onSubmit() {

    this.bs.searchBus(this.toBus, this.fromBus, this.busSearch.get("selSeats").value).subscribe(data => {
      if (Array.isArray(data) && data.length) {
        this.dataSource = data;
        this.flag = false;
        this.bookPressed = false;
        this.sucPay = false;
      }
      else {
        this.flag = true;
      }
    }
    );
    this.bookPressed = false;
  }

}
