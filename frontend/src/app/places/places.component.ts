import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  
  categories: any[] = [
    {value: 'sea', viewValue: 'Sea'},
    {value: 'food', viewValue: 'Food'},
    {value: 'historical', viewValue: 'Historical'}
  ];
  
  searchTerm: String = "";
  
  places: any = [];

  constructor(private ps: PlacesService) { }

  ngOnInit() {
    this.ps.getTop().subscribe(x => {this.places = x});
  }

}
