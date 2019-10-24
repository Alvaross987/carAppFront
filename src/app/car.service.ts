import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Car } from "./car";
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  items;
  private baseUrl = 'http://localhost:8080/app/cars';
  constructor(private http: HttpClient,
  ) { }
  /*
      getCars(): Observable<Car[]> {
          const url = `${this.baseUrl}/`;
          return this.http.get<Car[]>(url);
      }
  
      addCar(car : Car): Observable<Car> {
        const url = `${this.baseUrl}/`;
        return this.http.post<Car>(url, car);
    }
  
    updateCar(id : number, car : Car): Observable<Car> {
      const url = ``${this.baseUrl}/${id}`;
      return this.http.put<Car>(url, car);
  }*/
  private carsUrl = 'api/cars';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        catchError(this.handleError<Car[]>('getCars', []))
      );
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateCar'))
    );
  }
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      catchError(this.handleError<Car>('addCar'))
    );
  }

  deleteCar(car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carsUrl}/${id}`;

    return this.http.delete<Car>(url, this.httpOptions).pipe(
      catchError(this.handleError<Car>('deleteCar'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }


}