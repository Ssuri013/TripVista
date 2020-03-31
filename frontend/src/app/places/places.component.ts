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
  selectedCategory = ""
  
  searchTerm: String = "";
  
  places: any = [];

  constructor(private ps: PlacesService) { }

  ngOnInit() {
    this.getTopPlaces();
  }

  getTopPlaces() {
    this.ps.getTop().subscribe(x => {this.places = x});
  }

  searchKeyword() {
    this.ps.getSearch(this.searchTerm).subscribe(x => {this.places = x});
  }

  getCategory() {
    this.ps.getCategory(this.selectedCategory).subscribe(x => {this.places = x});
  }

  reportHit(data: any) {
    this.ps.reportPlaceHit(data.place_id).subscribe( x => console.log("successful report of hit to analysis engine"));
  }
  
}
