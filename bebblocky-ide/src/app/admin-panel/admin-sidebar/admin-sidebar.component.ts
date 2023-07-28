import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHtml5, faCss3, faSquareJs, faPython } from '@fortawesome/free-brands-svg-icons';
import { faCode, faUser, faLayerGroup, faFileCode, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  isExpanded: boolean = false;
  currentMenuItemName: String = '';

  generalMenuItems: any[] = []
  userMenuItems: any[] = []
  courseMenuItems: any[] = [];


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.generalMenuItems = [
      { name: 'Add a new Course',  link: '/admin/create-course', icon: faPlus, class: 'special' },
    ]
    this.userMenuItems = [
    ]
    this.courseMenuItems = [
      { name: 'All Courses', link: '/admin/courses', icon: faLayerGroup, class: 'regular' },
      { name: 'HTML Courses', link: '/admin/html-courses', icon: faHtml5, class: 'regular' },
      { name: 'CSS Courses', link: '/admin/css-courses', icon: faCss3, class: 'regular' },
      { name: 'JS Courses', link: '/admin/js-courses', icon: faSquareJs, class: 'regular' },
      { name: 'Python Courses', link: '/admin/python-courses', icon: faPython, class: 'regular' },
      // Add more menu items here
    ];
  }

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