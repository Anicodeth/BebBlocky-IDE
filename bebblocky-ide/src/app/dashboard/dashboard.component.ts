import { Component, DoCheck, OnChanges } from '@angular/core';
import { BridgeService } from '../shared/services/bridge.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  constructor(
    private bridgeService: BridgeService
  ) {}

  ngOnChanges() {
    this.bridgeService.setUser();
  }
}
