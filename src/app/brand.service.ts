import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  items;
  private baseUrl = 'http://localhost:8080/app/brand';
  constructor(private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  getAllBrand(): Observable<Brand[]> {

    return this.http.get<Brand[]>(this.baseUrl).pipe(
        catchError(this.handleError<Brand[]>('getAllBrand', []))
      );
  }

  getBrand(id: number): Observable<Brand[]> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Brand[]>(url).pipe(
      catchError(this.handleError<Brand[]>(`getBrand id=${id}`, []))
    );
  }

  updateBrand(brand: Brand): Observable<any> {
    const url = `${this.baseUrl}/${brand.id}`;
    return this.http.put(url, brand, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBrand'))
    );
  }
  
  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.baseUrl, brand, this.httpOptions).pipe(
      catchError(this.handleError<Brand>('addBrand'))
    );
  }

  deleteBrand(brand: Brand | number): Observable<Brand> {
    const id = typeof brand === 'number' ? brand : brand.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<Brand>(url, this.httpOptions).pipe(
      catchError(this.handleError<Brand>('deleteBrand'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
