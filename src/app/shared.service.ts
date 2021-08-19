import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Sets up subject objects to be used in shared functions
  private startSubject = new Subject<any>();
  private resetSubject = new Subject<any>();
  private stopSubject = new Subject<any>();
  private wpmSubject = new Subject<any>();
  private errorsSubject = new Subject<any>();
  private accuracySubject = new Subject<any>();

  // Sets up functions to call/share between components
  startEvent() { this.startSubject.next(); }
  getStartEvent(): Observable<any> { return this.startSubject.asObservable(); }

  resetEvent() { this.resetSubject.next(); }
  getResetEvent(): Observable<any> { return this.resetSubject.asObservable(); }

  stopEvent() { this.stopSubject.next(); }
  getStopEvent(): Observable<any> { return this.stopSubject.asObservable(); }

  wpmEvent(spacesArg: number) { this.wpmSubject.next(spacesArg); }
  getWpmEvent(): Observable<any> { return this.wpmSubject.asObservable(); }

  errorsEvent(errorsArg: number) { this.errorsSubject.next(errorsArg); }
  getErrorsEvent(): Observable<any> { return this.errorsSubject.asObservable(); }

  accuracyEvent(charsArg: number) { this.accuracySubject.next(charsArg); }
  getAccuracyEvent(): Observable<any> { return this.accuracySubject.asObservable(); }
}
