import { Injectable } from '@angular/core';
import { User } from "./user";

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  items;
  private baseUrl = 'http://localhost:8080/app/user';

  constructor(private http: HttpClient
  ) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(user: User): Observable<String> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<String>(url, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };



  }
}
