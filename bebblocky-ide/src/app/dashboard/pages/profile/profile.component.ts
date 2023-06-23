import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.dto';
import { BridgeService } from 'src/app/shared/services/bridge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public ads: any[] = [
    {
      title: 'MacBook Pro 13"',
      image: 'https://via.placeholder.com/300x200',
      description: 'Brand new MacBook Pro 13" with Retina display, 8GB of RAM and 256GB SSD.',
      price: '$1,299',
      category: 'Electronics',
      date: 'June 23, 2023'
    },
    {
      title: 'Nike Air Max 270',
      image: 'https://via.placeholder.com/300x200',
      description: 'Brand new Nike Air Max 270 sneakers in black and white, size 10.',
      price: '$120',
      category: 'Fashion',
      date: 'June 22, 2023'
    },
  ];

  constructor(
    private bridgeService: BridgeService
  ) {
    this.user = this.bridgeService.getUser();
  }

  ngOnInit(): void {
    this.user = this.bridgeService.getUser();
  }

}
