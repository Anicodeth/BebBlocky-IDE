import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardLoadingService {
  private loading = false;

  get isLoading() {
    return this.loading;
  }

  set isLoading(value: boolean) {
    this.loading = value;
  }
}