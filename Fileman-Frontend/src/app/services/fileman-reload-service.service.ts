import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilemanReloadService {
  private reloadRequestNotifier: Subject<void>;

  constructor() {
    this.reloadRequestNotifier = new Subject<void>();
  }

  public requestReload() {
    return this.reloadRequestNotifier.next();
  }

  public getReloadRequestNotifier(): Observable<void> {
    return this.reloadRequestNotifier.asObservable();
  }
}
