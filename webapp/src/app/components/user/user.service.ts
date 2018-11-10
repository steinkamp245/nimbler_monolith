import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError as _throw } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import canteenConf from '../../../../canteen.conf';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private options = { withCredentials: true };
  private baseURL = canteenConf.restApiUrl;
  isAuthenticated = false;
  @Output() isAuthenticatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private http: HttpClient) { }

  changeAuthenticationStatus(status: boolean) {
    this.isAuthenticatedEvent.emit(status);
    this.isAuthenticated = status;
  }

  socialSignIn(socialService: 'google' | 'facebook') {
    window.location.href = `${this.baseURL}/auth/${socialService}`;
  }

  signOut(): Observable<null> {
    return this.http.get(this.baseURL + '/auth/sign-out', this.options).pipe(
      map(data => this.changeAuthenticationStatus(false)),
      catchError(this.handleError)
    );
  }

  tokenCheck(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseURL + '/auth/token-check', this.options).pipe(
      map(data => data.isAuthenticated),
      catchError(this.handleError)
    );
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