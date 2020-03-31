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
  sucPay: boolean;
  bookingHist: Object;
  i: number = 0

  constructor(private bs: BookingService, private route: ActivatedRoute, private router: Router) {
    const currentDate = new Date();
    this.minDate = currentDate;
    this.bookPressed = false
  }

  displayedColumns = ['b_id', 'dep', 'arr', 'price', 'seats', 'booknow'];
  displayedHist = ['booking_id', 'booking_date', 'seats', 'price'];

  busSearch = new FormGroup({
    busTo: new FormControl('', Validators.required),//
    busFrom: new FormControl('', Validators.required),//Validators.required
    date: new FormControl('', Validators.required),
    selSeats: new FormControl('', Validators.required)
  })

  cardValidator: FormControl = new FormControl('', [Validators.required]);



  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value.toLocaleDateString()
    // this.events.push(`${type}: ${event.value}`);
  }

  cValid() {
    if (this.cardNo = "") {
      return false;
    }
    return true
  }

  ngOnInit() {
    let token = localStorage.getItem("token")
    console.log(token)
    if(token == null || token==""){
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
    this.bs.payment(this.busId, this.price * this.busSearch.get("selSeats").value, this.cardNo, this.busSearch.get("selSeats").value).subscribe(data => {
      this.test = data
      this.sucPay = true
      if (this.sucPay) {
        this.bs.bookingHistory().subscribe(data => {
          this.bookingHist = data
         
        })
      }

    },
      err => {
        this.sucPay = false
        alert("Card Not Valid!! Try Again")
        this.cardNo = ""
      }
    );


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
