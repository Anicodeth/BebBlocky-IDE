import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public showSpinner: boolean = false;
  public user: User;
  public ads: any[] = [
    {
      title: 'Yenetta Code',
      image: '../../assets/YenettaWebBlack-2.png',

    },
    {
      title: 'Jami',
      image: '../../assets/jami.svg',

    },
  ];

  constructor(
    private bridgeService: BridgeService
  ) {
    this.user = this.bridgeService.getUser();
  }

  ngOnInit(): void {
    this.showSpinner = true;

    // timeout to show the spinner
    setTimeout(() => {
      this.showSpinner = false;

      // Move the code that depends on this.showSpinner inside the timeout callback
      this.user = this.bridgeService.getUser();
    }, 1000);
  }
}
