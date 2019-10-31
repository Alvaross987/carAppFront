import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  items;
  private baseUrl = 'http://localhost:8080/app/country';
  constructor(private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getAllCountries(): Observable<Country[]> {

    return this.http.get<Country[]>(this.baseUrl).pipe(
        catchError(this.handleError<Country[]>('getAllCountries', []))
      );
  }

  getCountry(id: number): Observable<Country[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country[]>(url).pipe(
      catchError(this.handleError<Country[]>(`getCountry id=${id}`, []))
    );
  }

  updateCountry(car: Country): Observable<any> {
    const url = `${this.baseUrl}/${car.id}`;
    return this.http.put(url, car, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCountry'))
    );
  }
  
  addCountry(car: Country): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, car, this.httpOptions).pipe(
      catchError(this.handleError<Country>('addCountry'))
    );
  }

  deleteCountry(car: Country | number): Observable<Country> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Country>(url, this.httpOptions).pipe(
      catchError(this.handleError<Country>('deleteCountry'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
