import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private searchRangeSubject = new BehaviorSubject<number>(10);

  constructor() { }

  setSearchRangeSubject(value: number) {
    this.searchRangeSubject.next(value);
  }

  getSearchRangeSubect(): Observable<number> {
    return this.searchRangeSubject.asObservable();
  }
}
