import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public lockIcon: any = faLock;
  public user: User;

  constructor(
    private bridgeService: BridgeService,
    private router: Router
  ) {
    this.user = this.bridgeService.getUser();
  }

  ngOnInit(): void {
    this.user = this.bridgeService.getUser();
  }

  logout() {
    this.bridgeService.logout();
    this.router.navigate(['/']);
  }

}
