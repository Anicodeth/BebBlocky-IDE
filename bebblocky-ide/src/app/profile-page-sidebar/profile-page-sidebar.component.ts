import { Component, OnInit } from '@angular/core';
import { faTachometerAlt, faCode, faUser, faCog, faTableCells } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-page-sidebar',
  templateUrl: './profile-page-sidebar.component.html',
  styleUrls: ['./profile-page-sidebar.component.scss']
})
export class ProfilePageSidebarComponent implements OnInit {
  isExpanded: boolean = false;
  menuItems: any[] = [
    { name: 'Code', link: '/ide', icon: faCode, class: 'special' },
    { name: 'Dashboard', link: '/dashboard', icon: faTachometerAlt, class: 'regular' },
    { name: 'Profile', link: '/profile', icon: faUser, class: 'regular' },
    { name: 'Settings', link: '/settings', icon: faCog, class: 'regular' },
    { name: 'Catalog', link: '/catalog', icon: faTableCells, class: 'regular' },
    // Add more menu items here
  ];

  constructor() {}

  ngOnInit(): void {}

  expandSidebar(): void {
    this.isExpanded = true;
  }

  shrinkSidebar(): void {
    this.isExpanded = false;
  }
}