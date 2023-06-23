import { Component, DoCheck, OnInit } from '@angular/core';
import { faCss3, faHtml5, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import { faCode, faUser, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile-page-sidebar',
  templateUrl: './profile-page-sidebar.component.html',
  styleUrls: ['./profile-page-sidebar.component.scss']
})
export class ProfilePageSidebarComponent implements OnInit, DoCheck {
  isExpanded: boolean = false;
  currTab: any;
  menuItems: any[] = [
    { name: 'Code', link: '/ide/4', icon: faCode, class: 'special' },
    { name: 'Profile', link: '/courses/my', icon: faUser, class: 'regular' },
    { name: 'All Courses', link: '/courses', icon: faLayerGroup, class: 'regular' },
    { name: 'HTML Courses', link: '/courses/html', icon: faHtml5, class: 'regular' },
    { name: 'CSS Courses', link: '/courses/css', icon: faCss3, class: 'regular' },
    { name: 'JS Courses', link: '/courses/js', icon: faSquareJs, class: 'regular' },
    // Add more menu items here
  ];


  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void { }

  ngDoCheck() {}

  get currentRoute(): string {
    let type = this.route.snapshot.paramMap.get('slideId')!;

    switch (type) {
      case 'my':
        this.currTab = 'Profile';
        break;
      case 'html':
        this.currTab = 'HTML Courses';
        break;
      case 'css':
        this.currTab = 'CSS Courses';
        break;
      case 'js':
        this.currTab = 'JS Courses';
        break;
      default:
        this.currTab = 'All Courses';
        break;
    }

    return this.currTab;
  }


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

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}