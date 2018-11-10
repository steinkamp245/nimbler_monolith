import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  geolocation: Position;
  private geolocationAvailableSubject = new BehaviorSubject<boolean>(false);
  private geolocationBlockedSubject = new Subject<boolean>();

  constructor() { }


  async getGeolocation() {
    try {
      console.log('started');
      this.geolocation = await this.getGeolocationPromise();
      console.log(this.geolocation);
      this.setGeolocationAvailableSubject(true);
      this.setGeolocationBlockedSubject(false);
    }
    catch (error) {
      this.setGeolocationAvailableSubject(false);
      this.setGeolocationBlockedSubject(true);
    }
  }

  getGeolocationAvailableSubject(): Observable<boolean> {
    return this.geolocationAvailableSubject.asObservable();
  }

  setGeolocationAvailableSubject(status: boolean) {
    this.geolocationAvailableSubject.next(status);
  }

  getGeolocationBlockedSubject(): Observable<boolean> {
    return this.geolocationBlockedSubject.asObservable();
  }

  setGeolocationBlockedSubject(status: boolean) {
    this.geolocationBlockedSubject.next(status);
  }

  private getGeolocationPromise(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        success => resolve(success),
        err => reject(err))
    });
  }

  private getGeolocationStream(): Observable<Position> {
    return new Observable<Position>(
      observer => {
        navigator.geolocation.watchPosition(
          position => observer.next(position),
          err => observer.error(err)
        );
      })
  }
}
