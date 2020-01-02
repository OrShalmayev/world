import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }

  public fetchCities(): Observable<City[]>{
    return this.http.get<City[]>("api/cities");
  }

  public fetchCity(id:any): Observable<City> {
    return this.http.get<City>(`api/cities/${id}`);
  }

  public storeCity(city: City): Observable<City>{
    return this.http.post<City>('api/cities', city)
  }

  public updateCity(city: City, id:any): Observable<City> {
    return this.http.put<City>(`api/cities/${id}`, city);
  }

  public deleteCity(id: number): Observable<{}>{
    return this.http.delete(`api/cities/${id}`);
  }
}
