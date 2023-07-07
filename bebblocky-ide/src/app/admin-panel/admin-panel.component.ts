import { Component } from '@angular/core';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  constructor(
    private bridgeService: BridgeService
  ) {}

  ngOnChanges() {
    this.bridgeService.setUser();
  }
}
