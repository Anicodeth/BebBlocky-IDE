import { Component, OnInit } from '@angular/core';
import { faCss3, faHtml5, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import { faTachometerAlt, faCode, faUser, faCog, faTableCells, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-page-sidebar',
  templateUrl: './profile-page-sidebar.component.html',
  styleUrls: ['./profile-page-sidebar.component.scss']
})
export class ProfilePageSidebarComponent implements OnInit {
  isExpanded: boolean = false;
  menuItems: any[] = [
    { name: 'Code', link: '/ide/', icon: faCode, class: 'special' },
    { name: 'Profile', link: '/profile', icon: faUser, class: 'regular' },
    { name: 'All Courses', link: '/profile', icon: faLayerGroup, class: 'regular' },
    { name: 'HTML Courses', link: '/profile', icon: faHtml5, class: 'regular' },
    { name: 'CSS Courses', link: '/profile', icon: faCss3, class: 'regular' },
    { name: 'JS Courses', link: '/profile', icon: faSquareJs, class: 'regular' },
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