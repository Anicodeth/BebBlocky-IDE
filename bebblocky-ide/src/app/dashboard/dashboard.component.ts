import { Component, DoCheck } from '@angular/core';
import { Slide } from '../shared/models/slide.dto';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DashboardLoadingService } from '../shared/services/dashboard-loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private loadingService: DashboardLoadingService
  ) {}
  
  get showSpinner() {
    return this.loadingService.isLoading;
  }
}
