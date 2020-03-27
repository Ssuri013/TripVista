import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  getTop() {
    return this.http.get("http://localhost:3000/api/places/topplaces");
  }

  getSearch(keyword: String) {
    return this.http.get("http://localhost:3000/api/places/search?search=" + keyword);
  }

  getCategory(cat: String) {
    return this.http.get("http://localhost:3000/api/places/categories?cat=" + cat);
  }

}