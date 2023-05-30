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
    { name: 'Code', link: '/ide/4', icon: faCode, class: 'special' },
    { name: 'Profile', link: '/profile', icon: faUser, class: 'regular' },
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

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      document.addEventListener('click', this.onDocumentClick);
    } else {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }
  
  onDocumentClick = (event: any) => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.contains(event.target)) {
      this.isExpanded = false;
      document.removeEventListener('click', this.onDocumentClick);
    }
  }
}