import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHtml5, faCss3, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import { faCode, faUser, faLayerGroup, faFileCode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isExpanded: boolean = false;
  currentMenuItemName: String = '';

  generalMenuItems: any[] = [
    { name: 'Code', link: '/ide/4', icon: faCode, class: 'special' },
  ]
  userMenuItems: any[] = [
    { name: 'My Profile', link: '/dashboard/profile', icon: faUser, class: 'regular' },
    { name: 'My Courses', link: '/dashboard/my-courses', icon: faFileCode, class: 'regular' },
  ]
  courseMenuItems: any[] = [
    { name: 'All Courses', link: '/dashboard/courses', icon: faLayerGroup, class: 'regular' },
    { name: 'HTML Courses', link: '/dashboard/html-courses', icon: faHtml5, class: 'regular' },
    { name: 'CSS Courses', link: '/dashboard/css-courses', icon: faCss3, class: 'regular' },
    { name: 'JS Courses', link: '/dashboard/js-courses', icon: faSquareJs, class: 'regular' },
    // Add more menu items here
  ];


  constructor(private route: ActivatedRoute,
    private router: Router) { }

  setCurrentMenuItemName(name: String): void {
    this.currentMenuItemName = name;
  }

  expandSidebar(): void {
    setTimeout(() => {
    }, 1000);
    this.isExpanded = true;
  }

  shrinkSidebar(): void {
    setTimeout(() => {
    }, 1000);
    this.isExpanded = false;
  }

  toggleSidebar() {
    setTimeout(() => {
    }, 1000);
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

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}