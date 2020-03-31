import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  serverUrl = "https://www.tripvista.club";
  constructor(private http: HttpClient) { }

  getAllPlaces() {
    return this.http.get(this.serverUrl + "/api/places");
  }
  
  getTop() {
    return this.http.get(this.serverUrl +  "/api/places/top10");
  }

  getSearch(keyword: String) {
    return this.http.get(this.serverUrl +  "/api/places/search/" + keyword);
  }

  getCategory(cat: String) {
    return this.http.get( this.serverUrl + "/api/places/category/" + cat);
  }

}