import { Injectable } from '@angular/core';
import { User } from "./user";

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.baseUrl).pipe(
      catchError(this.handleError<User[]>('getAllUsers', []))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  authorization(): Boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("access_token");
    const decodedToken = helper.decodeToken(token);
    if (token != undefined && decodedToken.isadmin == 1) {
        return true;
    }
    return false
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };



  }
}
