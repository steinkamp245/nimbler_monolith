import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError as _throw, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import canteenConf from '../../../../canteen.conf';
import { EventConfig } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private options = { withCredentials: true };
  private baseURL = canteenConf.restApiUrl;

  isAuthenticated = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  setIsAuthenticatedSubject(status: boolean) {
    this.isAuthenticatedSubject.next(status);
    this.isAuthenticated = status;
  }

  getIsAuthenticatedSubject(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  socialSignIn(socialService: 'google' | 'facebook') {
    window.location.href = `${this.baseURL}/auth/${socialService}`;
  }

  signOut(): Observable<null> {
    return this.http.get(this.baseURL + '/auth/sign-out', this.options).pipe(
      map(data => this.setIsAuthenticatedSubject(false)),
      catchError(this.handleError)
    );
  }

  tokenCheck(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseURL + '/auth/token-check', this.options).pipe(
      map(data => data.isAuthenticated),
      catchError(this.handleError)
    );
  }

  getEventConfig(): Observable<EventConfig> {
    return this.http.get<{ eventConfig: EventConfig }>(this.baseURL + '/api/users/eventConfig', this.options).pipe(
      map(result => result.eventConfig),
      catchError(this.handleError)
    );
  }

  putEventConfigCategories(categories: string[]): Observable<{ categories: string[] }> {
    return this.http.put<{ categories: string[] }>(this.baseURL + '/api/users/eventConfig/categories', { categories }, this.options).pipe(
      catchError(this.handleError)
    )
  }

  putEventConfigLatestStartTime(latestStartTime: number): Observable<{ latestStartTime: number }> {
    return this.http.put<{ latestStartTime: number }>(this.baseURL + '/api/users/eventConfig/latestStartTime', { latestStartTime }, this.options).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let msg: string;
    if (error.error) {
      msg = error.error;
    } else if (error.message) {
      msg = error.message;
    } else {
      msg = `${error.status} - ${error.statusText || ''}`;
    }
    return _throw(msg);
  }
}