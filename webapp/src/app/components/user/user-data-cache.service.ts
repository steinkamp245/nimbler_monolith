import { Injectable } from '@angular/core';
import { EventConfig } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataCacheService {

  private eventConfigSubject = new BehaviorSubject<EventConfig>({ categories: [], latestStartTime: 0 });

  constructor() { }

  getEventConfigSubject(): Observable<EventConfig> {
    return this.eventConfigSubject.asObservable();
  }

  setEventConfigSubject(eventConfig: EventConfig) {
    this.eventConfigSubject.next(eventConfig);
  }
}
